"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { value: "oversized", label: "Oversized" },
  { value: "regular", label: "Regular Fit" },
  { value: "polo", label: "Polo" },
  { value: "hoodie", label: "Hoodie" },
  { value: "jersey", label: "Jersey" },
  { value: "general", label: "General" },
];

export default function NewProductPage() {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    name: "", slug: "", description: "", price: "", compare_at_price: "",
    category: "general", sizes: "S,M,L,XL,XXL", colors: "White,Black",
    stock_quantity: "0", is_active: true, is_featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const autoSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "name" && typeof value === "string" ? { slug: autoSlug(value) } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: insertError } = await supabase.from("products").insert({
      name: form.name,
      slug: form.slug,
      description: form.description || null,
      price: parseFloat(form.price),
      compare_at_price: form.compare_at_price ? parseFloat(form.compare_at_price) : null,
      category: form.category,
      sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
      stock_quantity: parseInt(form.stock_quantity) || 0,
      is_active: form.is_active,
      is_featured: form.is_featured,
      images: [],
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push("/admin/products");
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link href="/admin/products" className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#F05A22] text-sm font-medium mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
        <h1 className="text-3xl font-black text-[#1A1A1A]">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-[#E5E3DF] p-7 space-y-5">
          <h2 className="font-bold text-[#1A1A1A]">Basic Info</h2>
          <Input label="Product Name" id="product-name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} required placeholder="Classic Oversized Tee" />
          <Input label="Slug (URL)" id="product-slug" value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} required placeholder="classic-oversized-tee" hint="Used in the product URL" />
          <Textarea label="Description" id="product-desc" value={form.description} onChange={(e) => handleChange("description", e.target.value)} placeholder="Describe the product..." />
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E3DF] p-7 space-y-5">
          <h2 className="font-bold text-[#1A1A1A]">Pricing & Stock</h2>
          <div className="grid grid-cols-2 gap-5">
            <Input label="Price (₹)" id="product-price" type="number" value={form.price} onChange={(e) => handleChange("price", e.target.value)} required placeholder="699" />
            <Input label="Compare At Price (₹)" id="product-compare-price" type="number" value={form.compare_at_price} onChange={(e) => handleChange("compare_at_price", e.target.value)} placeholder="999" hint="Original/crossed-out price" />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <Select label="Category" id="product-category" options={CATEGORIES} value={form.category} onChange={(e) => handleChange("category", e.target.value)} />
            <Input label="Stock Quantity" id="product-stock" type="number" value={form.stock_quantity} onChange={(e) => handleChange("stock_quantity", e.target.value)} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E3DF] p-7 space-y-5">
          <h2 className="font-bold text-[#1A1A1A]">Variants</h2>
          <Input label="Sizes (comma separated)" id="product-sizes" value={form.sizes} onChange={(e) => handleChange("sizes", e.target.value)} placeholder="S,M,L,XL,XXL" hint="e.g. XS,S,M,L,XL,XXL" />
          <Input label="Colors (comma separated)" id="product-colors" value={form.colors} onChange={(e) => handleChange("colors", e.target.value)} placeholder="White,Black,Grey" />
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E3DF] p-7 space-y-4">
          <h2 className="font-bold text-[#1A1A1A]">Visibility</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.is_active} onChange={(e) => handleChange("is_active", e.target.checked)} className="w-4 h-4 accent-[#F05A22]" />
            <span className="text-sm font-medium text-[#1A1A1A]">Active (visible on shop)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.is_featured} onChange={(e) => handleChange("is_featured", e.target.checked)} className="w-4 h-4 accent-[#F05A22]" />
            <span className="text-sm font-medium text-[#1A1A1A]">Featured (show on homepage)</span>
          </label>
        </div>

        {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>}
        <Button type="submit" size="lg" loading={loading} className="w-full">Create Product</Button>
      </form>
    </div>
  );
}
