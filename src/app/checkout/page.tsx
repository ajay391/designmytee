"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useCartStore } from "@/store/cartStore";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { CheckCircle, Lock } from "lucide-react";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, total, clearCart } = useCartStore();
  const sub = subtotal();
  const tot = total();
  const shippingFee = sub >= 999 ? 0 : 99;

  const [address, setAddress] = useState({
    name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window.Razorpay !== "undefined") return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Create order in DB (payment pending)
    const { data: order, error: orderError } = await supabase.from("orders").insert({
      user_id: user?.id ?? null,
      source: "shop",
      items: items.map((i) => ({
        productId: i.productId, name: i.name, size: i.size,
        color: i.color, quantity: i.quantity, price: i.price,
      })),
      subtotal: sub,
      shipping_fee: shippingFee,
      total: tot,
      status: "pending",
      payment_status: "pending",
      shipping_address: address,
    }).select().single();

    if (orderError || !order) {
      setError("Failed to create order. Please try again.");
      setLoading(false);
      return;
    }

    // Load Razorpay
    const loaded = await loadRazorpay();
    if (!loaded) {
      setError("Payment gateway failed to load. Check your connection.");
      setLoading(false);
      return;
    }

    const rzpOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: Math.round(tot * 100), // paise
      currency: "INR",
      name: "DesignMyTee",
      description: `Order #${order.id.slice(-8).toUpperCase()}`,
      image: "/favicon.ico",
      order_id: order.razorpay_order_id ?? undefined,
      handler: async (response: Record<string, string>) => {
        // Payment success
        await supabase.from("orders").update({
          payment_status: "paid",
          payment_id: response.razorpay_payment_id,
          status: "confirmed",
        }).eq("id", order.id);

        clearCart();
        setSuccess(true);
        setLoading(false);
      },
      prefill: {
        name: address.name,
        contact: address.phone,
        email: user?.email ?? "",
      },
      theme: { color: "#F05A22" },
      modal: {
        ondismiss: () => setLoading(false),
      },
    };

    const rzp = new window.Razorpay(rzpOptions);
    rzp.open();
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8F7F5] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-black text-[#1A1A1A] mb-3">Order Confirmed! 🎉</h1>
          <p className="text-[#6B6B6B]">Your order is confirmed and will be dispatched within 5–7 working days.</p>
          <Button onClick={() => router.push("/account/orders")} className="mt-8">
            View My Orders
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F7F5] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-[#1A1A1A] mb-8">Checkout</h1>

        <form onSubmit={handleCheckout}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Address */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-[#E5E3DF] p-7 space-y-5">
                <h2 className="font-bold text-[#1A1A1A] text-lg">Delivery Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Full Name" id="checkout-name" value={address.name} onChange={(e) => handleChange("name", e.target.value)} required placeholder="Arjun Kumar" />
                  <Input label="Phone" id="checkout-phone" type="tel" value={address.phone} onChange={(e) => handleChange("phone", e.target.value)} required placeholder="+91 98765 43210" />
                </div>
                <Input label="Address Line 1" id="checkout-line1" value={address.line1} onChange={(e) => handleChange("line1", e.target.value)} required placeholder="House/Flat no., Building, Street" />
                <Input label="Address Line 2 (optional)" id="checkout-line2" value={address.line2} onChange={(e) => handleChange("line2", e.target.value)} placeholder="Area, Landmark" />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                  <Input label="City" id="checkout-city" value={address.city} onChange={(e) => handleChange("city", e.target.value)} required placeholder="Kochi" />
                  <Input label="State" id="checkout-state" value={address.state} onChange={(e) => handleChange("state", e.target.value)} required placeholder="Kerala" />
                  <Input label="Pincode" id="checkout-pincode" value={address.pincode} onChange={(e) => handleChange("pincode", e.target.value)} required placeholder="682001" />
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-white rounded-2xl border border-[#E5E3DF] p-6 sticky top-20">
                <h2 className="font-bold text-[#1A1A1A] mb-4">Order Summary</h2>
                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-[#6B6B6B] truncate max-w-[65%]">{item.name} × {item.quantity}</span>
                      <span className="font-medium text-[#1A1A1A]">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#E5E3DF] pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>Subtotal</span><span>{formatPrice(sub)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>Shipping</span>
                    <span className={shippingFee === 0 ? "text-green-600 font-semibold" : ""}>{shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between font-black text-[#1A1A1A] text-base pt-1">
                    <span>Total</span><span className="text-[#F05A22]">{formatPrice(tot)}</span>
                  </div>
                </div>

                {error && <p className="text-red-600 text-xs mt-3">{error}</p>}

                <Button type="submit" size="lg" loading={loading} className="w-full mt-5" icon={<Lock className="w-4 h-4" />}>
                  Pay {formatPrice(tot)}
                </Button>
                <p className="text-xs text-[#9A9A9A] text-center mt-3 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" /> Secured by Razorpay
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
