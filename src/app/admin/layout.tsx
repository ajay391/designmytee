"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard, Package, ShoppingBag, Users,
  Image, Settings, LogOut, Shirt, ChevronRight,
  ClipboardList, BarChart3, Menu, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/design-requests", label: "Design Requests", icon: ClipboardList },
  { href: "/admin/bulk-requests", label: "Bulk Requests", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Shirt },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-[#1A1A1A] text-white w-64">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="inline-block">
          <img
            src="/logo-transparent.png"
            alt="design my tee"
            className="h-11 sm:h-12 w-auto object-contain"
          />
          <p className="text-[10px] font-mono text-[#F05A22] font-bold uppercase tracking-widest mt-1">Admin Panel</p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
              isActive(item)
                ? "bg-[#F05A22] text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            )}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {item.label}
            {isActive(item) && <ChevronRight className="w-3 h-3 ml-auto" />}
          </Link>
        ))}
      </nav>

      {/* Sign out */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F7F5]">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="flex flex-col flex-shrink-0">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-[#E5E3DF] px-6 h-16 flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-[#F8F7F5] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-sm text-[#9A9A9A]">
            {pathname
              .split("/")
              .filter(Boolean)
              .map((segment, i, arr) => (
                <span key={segment} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight className="w-3 h-3" />}
                  <span className={i === arr.length - 1 ? "text-[#1A1A1A] font-semibold capitalize" : "capitalize"}>
                    {segment.replace(/-/g, " ")}
                  </span>
                </span>
              ))}
          </div>
          <div className="ml-auto">
            <Link
              href="/"
              className="text-sm text-[#6B6B6B] hover:text-[#F05A22] transition-colors"
            >
              View Site ↗
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
