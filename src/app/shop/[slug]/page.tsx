"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const supabase = createClient();
  const addItem = useCartStore((s) => s.addItem);

  const [product, setProduct] = useState<Record<string, unknown> | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("products").select("*").eq("slug", slug).single().then(({ data }) => {
      setProduct(data);
      if (data?.sizes?.[0]) setSelectedSize(data.sizes[0]);
      if (data?.colors?.[0]) setSelectedColor(data.colors[0]);
      setLoading(false);
    });
  }, [slug]);

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;
    addItem({
      productId: product.id as string,
      name: product.name as string,
      price: product.price as number,
      image: (product.images as string[])?.[0] ?? "",
      size: selectedSize,
      color: selectedColor,
      slug: slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#F05A22] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#9A9A9A]">
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">Product not found</p>
          <Link href="/shop" className="text-[#F05A22] hover:underline">Back to shop</Link>
        </div>
      </div>
    );
  }

  const images = (product.images as string[]) ?? [];
  const sizes = (product.sizes as string[]) ?? [];
  const colors = (product.colors as string[]) ?? [];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/shop" className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#F05A22] text-sm font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square bg-[#F8F7F5] rounded-3xl overflow-hidden mb-4 flex items-center justify-center">
              {images[selectedImage] ? (
                <img src={images[selectedImage]} alt={product.name as string} className="w-full h-full object-cover" />
              ) : (
                <span className="text-9xl">{product.category === "hoodie" ? "🧥" : product.category === "polo" ? "👔" : "👕"}</span>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${i === selectedImage ? "border-[#F05A22]" : "border-transparent"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <span className="text-[#F05A22] text-sm font-semibold uppercase tracking-wider capitalize">{product.category as string}</span>
              <h1 className="text-4xl font-black text-[#1A1A1A] mt-1">{product.name as string}</h1>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-3xl font-black text-[#F05A22]">{formatPrice(product.price as number)}</span>
                {(product.compare_at_price as number | null) && (
                  <span className="text-lg text-[#9A9A9A] line-through">{formatPrice(product.compare_at_price as number)}</span>
                )}
              </div>
            </div>

            {(product.description as string | null) && (
              <p className="text-[#6B6B6B] leading-relaxed">{product.description as string}</p>
            )}

            {/* Colors */}
            {colors.length > 0 && (
              <div>
                <p className="font-semibold text-[#1A1A1A] mb-3 text-sm">Color: <span className="text-[#F05A22]">{selectedColor}</span></p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                        selectedColor === color
                          ? "border-[#F05A22] bg-[#F05A22]/5 text-[#F05A22]"
                          : "border-[#E5E3DF] text-[#6B6B6B] hover:border-[#F05A22]"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {sizes.length > 0 && (
              <div>
                <p className="font-semibold text-[#1A1A1A] mb-3 text-sm">Size: <span className="text-[#F05A22]">{selectedSize}</span></p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl text-sm font-bold border-2 transition-all ${
                        selectedSize === size
                          ? "border-[#F05A22] bg-[#F05A22] text-white"
                          : "border-[#E5E3DF] text-[#6B6B6B] hover:border-[#F05A22]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full"
              icon={added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
              variant={added ? "secondary" : "primary"}
            >
              {added ? "Added to Cart!" : "Add to Cart"}
            </Button>

            <p className="text-xs text-[#9A9A9A] text-center">
              Free shipping on orders above ₹999 · Pan-India delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
