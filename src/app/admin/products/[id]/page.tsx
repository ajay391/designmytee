"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Upload, X, Star, Link as LinkIcon, Trash2 } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { value: "oversized", label: "Oversized" },
  { value: "regular", label: "Regular Fit" },
  { value: "polo", label: "Polo" },
  { value: "hoodie", label: "Hoodie" },
  { value: "jersey", label: "Jersey" },
  { value: "general", label: "General" },
];

interface ImageItem {
  id: string;
  type: "file" | "url";
  file?: File;
  previewUrl: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const productId = params?.id;
  const supabase = createClient();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    compare_at_price: "",
    category: "general",
    sizes: "S,M,L,XL,XXL",
    colors: "White,Black",
    stock_quantity: "0",
    is_active: true,
    is_featured: false,
  });

  const [images, setImages] = useState<ImageItem[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) return;

    supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single()
      .then(({ data, error: fetchErr }) => {
        if (fetchErr || !data) {
          setError("Failed to load product details.");
          setInitialLoading(false);
          return;
        }

        setForm({
          name: data.name || "",
          slug: data.slug || "",
          description: data.description || "",
          price: data.price ? String(data.price) : "",
          compare_at_price: data.compare_at_price ? String(data.compare_at_price) : "",
          category: data.category || "general",
          sizes: Array.isArray(data.sizes) ? data.sizes.join(", ") : "",
          colors: Array.isArray(data.colors) ? data.colors.join(", ") : "",
          stock_quantity: String(data.stock_quantity ?? 0),
          is_active: data.is_active ?? true,
          is_featured: data.is_featured ?? false,
        });

        if (Array.isArray(data.images)) {
          setImages(
            data.images.map((url: string) => ({
              id: Math.random().toString(36).substring(2, 9),
              type: "url",
              previewUrl: url,
            }))
          );
        }

        setInitialLoading(false);
      });
  }, [productId]);

  const autoSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "name" && typeof value === "string" && !prev.slug ? { slug: autoSlug(value) } : {}),
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newItems: ImageItem[] = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      type: "file",
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newItems]);
    e.target.value = "";
  };

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    try {
      new URL(trimmed);
    } catch {
      setError("Please enter a valid URL (e.g. https://example.com/image.jpg)");
      return;
    }

    setImages((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        type: "url",
        previewUrl: trimmed,
      },
    ]);
    setUrlInput("");
    setError("");
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSetCover = (index: number) => {
    if (index === 0) return;
    setImages((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(index, 1);
      updated.unshift(moved);
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;

    setLoading(true);
    setError("");

    try {
      const finalImageUrls: string[] = [];

      for (let i = 0; i < images.length; i++) {
        const item = images[i];
        if (item.type === "url") {
          finalImageUrls.push(item.previewUrl);
        } else if (item.file) {
          setUploadStatus(`Uploading image ${i + 1} of ${images.length}...`);
          const ext = item.file.name.split(".").pop() || "jpg";
          const path = `products/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;

          const { error: uploadError } = await supabase.storage
            .from("design-files")
            .upload(path, item.file, { upsert: true });

          if (uploadError) {
            throw new Error(`Failed to upload ${item.file.name}: ${uploadError.message}`);
          }

          const { data: { publicUrl } } = supabase.storage
            .from("design-files")
            .getPublicUrl(path);

          finalImageUrls.push(publicUrl);
        }
      }

      setUploadStatus("Updating product details...");

      const { error: updateError } = await supabase
        .from("products")
        .update({
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
          images: finalImageUrls,
          updated_at: new Date().toISOString(),
        })
        .eq("id", productId);

      if (updateError) {
        throw new Error(updateError.message);
      }

      router.push("/admin/products");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
      setLoading(false);
      setUploadStatus("");
    }
  };

  const handleDelete = async () => {
    if (!productId) return;
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;

    setDeleting(true);
    try {
      const { error: deleteErr } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (deleteErr) throw new Error(deleteErr.message);

      router.push("/admin/products");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete product.";
      setError(msg);
      setDeleting(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#F05A22] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/products" className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#F05A22] text-sm font-medium mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <h1 className="text-3xl font-black text-[#1A1A1A]">Edit Product</h1>
        </div>
        <Button type="button" variant="secondary" onClick={handleDelete} loading={deleting} className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50">
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-[#E5E3DF] p-7 space-y-5">
          <h2 className="font-bold text-[#1A1A1A]">Basic Info</h2>
          <Input label="Product Name" id="product-name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} required placeholder="Classic Oversized Tee" />
          <Input label="Slug (URL)" id="product-slug" value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} required placeholder="classic-oversized-tee" hint="Used in the product URL" />
          <Textarea label="Description" id="product-desc" value={form.description} onChange={(e) => handleChange("description", e.target.value)} placeholder="Describe the product..." />
        </div>

        {/* Product Images Section */}
        <div className="bg-white rounded-2xl border border-[#E5E3DF] p-7 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[#1A1A1A]">Product Images</h2>
              <p className="text-xs text-[#9A9A9A] mt-0.5">Upload multiple photos. The first image will be used as the main cover photo.</p>
            </div>
            {images.length > 0 && (
              <span className="text-xs font-semibold px-2.5 py-1 bg-[#F05A22]/10 text-[#F05A22] rounded-full">
                {images.length} {images.length === 1 ? "image" : "images"}
              </span>
            )}
          </div>

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-[#E5E3DF] hover:border-[#F05A22] transition-colors rounded-2xl p-6 text-center bg-[#F8F7F5]/50">
            <input
              type="file"
              id="product-images-input"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <label htmlFor="product-images-input" className="cursor-pointer flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-[#F05A22]/10 text-[#F05A22] flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-[#1A1A1A] text-sm">Click to upload product images</p>
                <p className="text-xs text-[#9A9A9A] mt-0.5">PNG, JPG, WEBP up to 10MB (Select multiple)</p>
              </div>
            </label>
          </div>

          {/* Add via URL */}
          <div className="flex gap-2 items-end pt-2 border-t border-[#E5E3DF]">
            <div className="flex-1">
              <Input
                label="Or Add Image by URL"
                id="product-image-url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
              />
            </div>
            <Button type="button" variant="secondary" onClick={handleAddUrl} className="flex items-center gap-1.5 whitespace-nowrap">
              <LinkIcon className="w-4 h-4" /> Add URL
            </Button>
          </div>

          {/* Previews Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 pt-2">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  className={`relative group aspect-square rounded-2xl overflow-hidden border ${
                    idx === 0 ? "border-2 border-[#F05A22] ring-2 ring-[#F05A22]/20" : "border-[#E5E3DF]"
                  } bg-[#F8F7F5]`}
                >
                  <img
                    src={img.previewUrl}
                    alt={`Product preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Primary Cover Badge */}
                  {idx === 0 ? (
                    <span className="absolute top-2 left-2 bg-[#F05A22] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <Star className="w-2.5 h-2.5 fill-current" /> Cover
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSetCover(idx)}
                      className="absolute top-2 left-2 bg-black/60 hover:bg-[#F05A22] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                    >
                      Make Cover
                    </button>
                  )}

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(img.id)}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E3DF] p-7 space-y-5">
          <h2 className="font-bold text-[#1A1A1A]">Pricing & Stock</h2>
          <div className="grid grid-cols-2 gap-5">
            <Input label="Price (₹)" id="product-price" type="number" value={form.price} onChange={(e) => handleChange("price", e.target.value)} required placeholder="699" />
            <Input label="Compare At Price (₹)" id="product-price-compare" type="number" value={form.compare_at_price} onChange={(e) => handleChange("compare_at_price", e.target.value)} placeholder="999" hint="Original/crossed-out price" />
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

        {uploadStatus && (
          <p className="text-xs font-semibold text-[#F05A22] bg-[#F05A22]/10 px-4 py-2.5 rounded-xl animate-pulse">
            {uploadStatus}
          </p>
        )}

        {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>}
        <Button type="submit" size="lg" loading={loading} className="w-full">Save Changes</Button>
      </form>
    </div>
  );
}
