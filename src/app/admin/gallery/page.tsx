"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Trash2, Star, Upload } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  technique: string;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export default function AdminGalleryPage() {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: "", category: "", technique: "" });

  const load = async () => {
    const { data } = await supabase.from("gallery_items").select("*").order("sort_order").order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (file: File) => {
    if (!form.title) { alert("Please enter a title first."); return; }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `gallery/${Date.now()}.${ext}`;
    await supabase.storage.from("design-files").upload(path, file);
    const { data: { publicUrl } } = supabase.storage.from("design-files").getPublicUrl(path);
    await supabase.from("gallery_items").insert({
      title: form.title,
      image_url: publicUrl,
      category: form.category,
      technique: form.technique,
    });
    setForm({ title: "", category: "", technique: "" });
    await load();
    setUploading(false);
  };

  const toggleFeatured = async (item: GalleryItem) => {
    await supabase.from("gallery_items").update({ is_featured: !item.is_featured }).eq("id", item.id);
    await load();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this gallery item?")) return;
    await supabase.from("gallery_items").delete().eq("id", id);
    await load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-[#1A1A1A]">Gallery Management</h1>

      {/* Add item */}
      <div className="bg-white rounded-2xl border border-[#E5E3DF] p-6">
        <h2 className="font-bold text-[#1A1A1A] mb-5">Add New Item</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <Input label="Title" id="gallery-title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. College Fest Jersey" required />
          <Input label="Category" id="gallery-category" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="e.g. jerseys" />
          <Input label="Technique" id="gallery-technique" value={form.technique} onChange={(e) => setForm((f) => ({ ...f, technique: e.target.value }))} placeholder="e.g. Sublimation" />
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
        <Button onClick={() => fileInputRef.current?.click()} loading={uploading} icon={<Upload className="w-4 h-4" />}>
          Upload Image
        </Button>
      </div>

      {/* Items grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <div key={i} className="aspect-square skeleton rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-2xl border border-[#E5E3DF] overflow-hidden">
              <img src={item.image_url} alt={item.title} className="w-full aspect-square object-cover" />
              <div className="p-3">
                <p className="font-semibold text-[#1A1A1A] text-sm truncate">{item.title}</p>
                {item.technique && <p className="text-xs text-[#9A9A9A]">{item.technique}</p>}
              </div>
              <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toggleFeatured(item)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${item.is_featured ? "bg-[#F05A22] text-white" : "bg-white/90 text-[#9A9A9A] hover:text-[#F05A22]"}`}
                  title={item.is_featured ? "Unfeature" : "Feature"}
                >
                  <Star className="w-4 h-4" fill={item.is_featured ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {item.is_featured && (
                <div className="absolute top-2 left-2 bg-[#F05A22] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  Featured
                </div>
              )}
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-4 text-center py-16 text-[#9A9A9A] text-sm">
              No gallery items yet. Upload your first one!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
