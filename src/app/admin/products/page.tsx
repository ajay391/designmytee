import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatDate, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Plus, Edit } from "lucide-react";

export const metadata = { title: "Products | Admin" };

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select("*").order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-[#1A1A1A]">Products</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-[#F05A22] text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-[#C8461A] transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E3DF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8F7F5] border-b border-[#E5E3DF]">
                {["Product", "Category", "Price", "Stock", "Active", "Featured", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#9A9A9A] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E3DF]">
              {(products ?? []).map((product) => (
                <tr key={product.id} className="hover:bg-[#F8F7F5] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F8F7F5] rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <span>{product.category === "hoodie" ? "🧥" : "👕"}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-[#1A1A1A] text-sm">{product.name}</p>
                        <p className="text-xs text-[#9A9A9A]">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className="text-sm text-[#6B6B6B] capitalize">{product.category}</span></td>
                  <td className="px-5 py-4">
                    <span className="font-bold text-[#1A1A1A] text-sm">{formatPrice(product.price)}</span>
                    {product.compare_at_price && (
                      <span className="text-xs text-[#9A9A9A] line-through ml-1">{formatPrice(product.compare_at_price)}</span>
                    )}
                  </td>
                  <td className="px-5 py-4"><span className="text-sm font-medium text-[#1A1A1A]">{product.stock_quantity}</span></td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${product.is_active ? "text-green-600" : "text-[#9A9A9A]"}`}>
                      {product.is_active ? "✓ Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold ${product.is_featured ? "text-[#F05A22]" : "text-[#9A9A9A]"}`}>
                      {product.is_featured ? "⭐ Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/admin/products/${product.id}`} className="flex items-center gap-1 text-[#F05A22] text-xs font-semibold hover:underline">
                      <Edit className="w-3 h-3" /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(products ?? []).length === 0 && (
            <div className="text-center py-16 text-[#9A9A9A] text-sm">
              No products yet.{" "}
              <Link href="/admin/products/new" className="text-[#F05A22] font-semibold">Add one</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
