"use client";

import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, total } = useCartStore();
  const sub = subtotal();
  const tot = total();
  const shippingFee = sub > 0 ? (sub >= 999 ? 0 : 99) : 0;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F7F5] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 mx-auto text-[#E5E3DF] mb-6" />
          <h1 className="text-3xl font-black text-[#1A1A1A] mb-2">Your cart is empty</h1>
          <p className="text-[#6B6B6B] mb-8">Browse our shop or submit a custom request</p>
          <div className="flex gap-4 justify-center">
            <Link href="/shop" className="bg-[#F05A22] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#C8461A] transition-colors">
              Browse Shop
            </Link>
            <Link href="/custom-request" className="border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold px-6 py-3 rounded-xl hover:bg-[#1A1A1A] hover:text-white transition-colors">
              Custom Request
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F5] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-[#1A1A1A] mb-8">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-[#E5E3DF] p-5 flex gap-5">
                {/* Image */}
                <div className="w-20 h-20 bg-[#F8F7F5] rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl">👕</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1A1A1A]">{item.name}</p>
                  <p className="text-sm text-[#9A9A9A] mt-0.5">{item.size} · {item.color}</p>
                  <p className="font-black text-[#F05A22] mt-1">{formatPrice(item.price)}</p>
                </div>

                {/* Qty + remove */}
                <div className="flex flex-col items-end gap-3">
                  <button onClick={() => removeItem(item.id)} className="text-[#9A9A9A] hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 border border-[#E5E3DF] rounded-lg flex items-center justify-center hover:border-[#F05A22] transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 border border-[#E5E3DF] rounded-lg flex items-center justify-center hover:border-[#F05A22] transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-[#1A1A1A]">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-[#E5E3DF] p-6 sticky top-20">
              <h2 className="font-bold text-[#1A1A1A] text-lg mb-5">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)</span>
                  <span>{formatPrice(sub)}</span>
                </div>
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Shipping</span>
                  <span className={shippingFee === 0 ? "text-green-600 font-semibold" : ""}>
                    {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                  </span>
                </div>
                {shippingFee > 0 && (
                  <p className="text-xs text-[#9A9A9A]">Add {formatPrice(999 - sub)} more for free shipping</p>
                )}
                <div className="border-t border-[#E5E3DF] pt-3 flex justify-between font-black text-[#1A1A1A] text-base">
                  <span>Total</span>
                  <span className="text-[#F05A22]">{formatPrice(tot)}</span>
                </div>
              </div>

              <Link href="/checkout" className="mt-6 flex items-center justify-center gap-2 bg-[#F05A22] text-white font-bold px-6 py-3.5 rounded-xl hover:bg-[#C8461A] transition-colors w-full">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>

              <Link href="/shop" className="mt-3 flex items-center justify-center text-sm text-[#6B6B6B] hover:text-[#F05A22] transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
