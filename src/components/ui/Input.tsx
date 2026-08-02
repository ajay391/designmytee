"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#1A1A1A]"
          >
            {label}
            {props.required && <span className="text-[#F05A22] ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A9A]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-11 rounded-xl border border-[#E5E3DF] bg-white px-4 text-sm text-[#1A1A1A] placeholder:text-[#9A9A9A]",
              "transition-all duration-200 outline-none",
              "focus:border-[#F05A22] focus:ring-2 focus:ring-[#F05A22]/20",
              "disabled:bg-[#F8F7F5] disabled:cursor-not-allowed",
              error && "border-red-500 focus:border-red-500 focus:ring-red-200",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A9A]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
        {hint && !error && <p className="text-xs text-[#9A9A9A]">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[#1A1A1A]">
            {label}
            {props.required && <span className="text-[#F05A22] ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-xl border border-[#E5E3DF] bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9A9A9A]",
            "transition-all duration-200 outline-none resize-y min-h-[120px]",
            "focus:border-[#F05A22] focus:ring-2 focus:ring-[#F05A22]/20",
            "disabled:bg-[#F8F7F5] disabled:cursor-not-allowed",
            error && "border-red-500 focus:border-red-500 focus:ring-red-200",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        {hint && !error && <p className="text-xs text-[#9A9A9A]">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, placeholder, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[#1A1A1A]">
            {label}
            {props.required && <span className="text-[#F05A22] ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            "w-full h-11 rounded-xl border border-[#E5E3DF] bg-white px-4 text-sm text-[#1A1A1A]",
            "transition-all duration-200 outline-none cursor-pointer appearance-none",
            "focus:border-[#F05A22] focus:ring-2 focus:ring-[#F05A22]/20",
            "disabled:bg-[#F8F7F5] disabled:cursor-not-allowed",
            error && "border-red-500",
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-600">{error}</p>}
        {hint && !error && <p className="text-xs text-[#9A9A9A]">{hint}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
