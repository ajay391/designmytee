"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Shirt, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, phone },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8F7F5] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-[#1A1A1A]">Check your email!</h2>
          <p className="text-[#6B6B6B] mt-3 max-w-sm mx-auto">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-[#F05A22] text-white font-bold px-6 py-3 rounded-xl mt-8 hover:bg-[#C8461A] transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F5] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6 group">
            <img
              src="/logo-transparent.png"
              alt="design my tee"
              className="h-16 sm:h-20 md:h-24 w-auto mx-auto object-contain group-hover:scale-105 transition-transform"
            />
          </Link>
          <h1 className="text-3xl font-black text-[#1A1A1A]">Create an account</h1>
          <p className="text-[#6B6B6B] mt-2">Track your design requests and orders</p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E5E3DF] p-8 shadow-sm">
          <form onSubmit={handleSignup} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              id="signup-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Full Name"
              required
            />
            <Input
              label="Email"
              type="email"
              id="signup-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
            <Input
              label="Phone Number"
              type="tel"
              id="signup-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              hint="For order updates via WhatsApp"
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              id="signup-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              required
              hint="At least 8 characters"
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-[#F05A22] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Create Account
            </Button>

            <p className="text-xs text-[#9A9A9A] text-center">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-[#F05A22] hover:underline">Terms</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-[#F05A22] hover:underline">Privacy Policy</Link>
            </p>
          </form>

          <p className="text-center text-sm text-[#6B6B6B] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#F05A22] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
