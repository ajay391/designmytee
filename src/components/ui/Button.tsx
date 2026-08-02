"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A22] focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-[#F05A22] text-white hover:bg-[#C8461A] active:scale-[0.98] shadow-sm hover:shadow-md",
    secondary:
      "bg-[#1A1A1A] text-white hover:bg-[#333] active:scale-[0.98] shadow-sm",
    outline:
      "border-2 border-[#F05A22] text-[#F05A22] bg-transparent hover:bg-[#F05A22] hover:text-white active:scale-[0.98]",
    ghost:
      "bg-transparent text-[#1A1A1A] hover:bg-[#F8F7F5] active:scale-[0.98]",
    danger:
      "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] shadow-sm",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm h-8",
    md: "px-5 py-2.5 text-sm h-10",
    lg: "px-7 py-3.5 text-base h-12",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        icon && iconPosition === "left" && icon
      )}
      {children}
      {!loading && icon && iconPosition === "right" && icon}
    </button>
  );
}
