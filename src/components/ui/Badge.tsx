"use client";

import { cn } from "@/lib/utils";
import { getStatusLabel } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "status";

interface BadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  status?: string;
  className?: string;
}

export function Badge({ children, variant = "default", status, className }: BadgeProps) {
  if (status) {
    return (
      <span
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          `status-${status}`,
          className
        )}
      >
        {getStatusLabel(status)}
      </span>
    );
  }

  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-green-50 text-green-700",
    warning: "bg-amber-50 text-amber-700",
    error: "bg-red-50 text-red-700",
    info: "bg-blue-50 text-blue-700",
    status: "bg-orange-50 text-orange-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
