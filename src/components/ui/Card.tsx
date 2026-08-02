"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, padding = "md", hover = false, onClick }: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-2xl border border-[#E5E3DF]",
        paddings[padding],
        hover && "card-hover cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  color?: string;
}

export function StatCard({ title, value, icon, change, changeType = "neutral", color = "#F05A22" }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#6B6B6B] font-medium">{title}</p>
          <p className="text-3xl font-bold text-[#1A1A1A] mt-1">{value}</p>
          {change && (
            <p
              className={cn(
                "text-xs mt-1 font-medium",
                changeType === "up" && "text-green-600",
                changeType === "down" && "text-red-600",
                changeType === "neutral" && "text-[#9A9A9A]"
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {icon}
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
        style={{ backgroundColor: color, opacity: 0.3 }}
      />
    </Card>
  );
}
