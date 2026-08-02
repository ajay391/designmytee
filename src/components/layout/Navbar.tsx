"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ShoppingCart, Menu, X, User, LogOut, ChevronDown, Shirt } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/shop", label: "Our Designs" },
  { href: "/custom-request", label: "Custom Request" },
  { href: "/bulk-order", label: "Bulk Order" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const cartCount = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user: u } }) => {
      if (u) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", u.id)
          .single();
        setUser({ email: u.email ?? "", role: profile?.role ?? "customer" });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();
        setUser({ email: session.user.email ?? "", role: profile?.role ?? "customer" });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-[#E5E3DF]"
            : "bg-white/80 backdrop-blur-md"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group z-10">
              <img
                src="/logo-transparent.png"
                alt="design my tee"
                className="h-9 sm:h-10 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* Desktop nav - Perfectly Center Aligned */}
            <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 z-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive(link.href)
                      ? "bg-[#F05A22] text-white shadow-sm"
                      : "text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F8F7F5]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 z-10">
              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/10 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-[#1A1A1A]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F05A22] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>

              {/* User menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#F8F7F5] transition-colors text-sm font-medium text-[#1A1A1A]"
                  >
                    <div className="w-7 h-7 bg-[#F05A22] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {user.email[0].toUpperCase()}
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-[#9A9A9A]" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#E5E3DF] rounded-2xl shadow-lg py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-[#E5E3DF]">
                        <p className="text-xs text-[#9A9A9A]">Signed in as</p>
                        <p className="text-sm font-medium text-[#1A1A1A] truncate">{user.email}</p>
                      </div>
                      {(user.role === "admin" || user.role === "designer") && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[#6B6B6B] hover:bg-[#F8F7F5] hover:text-[#1A1A1A] transition-colors"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <Link
                        href="/account/design-requests"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[#6B6B6B] hover:bg-[#F8F7F5] hover:text-[#1A1A1A] transition-colors"
                      >
                        <User className="w-4 h-4" /> My Requests
                      </Link>
                      <Link
                        href="/account/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[#6B6B6B] hover:bg-[#F8F7F5] hover:text-[#1A1A1A] transition-colors"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#6B6B6B] hover:text-[#1A1A1A] rounded-full hover:bg-[#F8F7F5] transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/custom-request"
                    className="px-5 py-2 text-xs font-black uppercase tracking-wider bg-[#F05A22] text-white rounded-full hover:bg-[#C8461A] shadow-md hover:shadow-lg transition-all duration-200 border border-[#F05A22]"
                  >
                    Start Request
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-[#F8F7F5] transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-[#E5E3DF] px-4 py-4 space-y-1 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-[#F05A22] text-white"
                    : "text-[#6B6B6B] hover:bg-[#F8F7F5] hover:text-[#1A1A1A]"
                )}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="pt-2 flex flex-col gap-2">
                <Link href="/login" onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-center border border-[#E5E3DF] text-[#6B6B6B]">
                  Sign In
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-semibold text-center bg-[#F05A22] text-white">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </header>
      {/* Spacer */}
      <div className="h-16" />
      {/* Backdrop for user menu */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
      )}
    </>
  );
}
