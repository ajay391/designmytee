import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    submitted: "Submitted",
    in_review: "In Review",
    assigned: "Assigned",
    in_progress: "In Progress",
    awaiting_feedback: "Awaiting Your Feedback",
    revision_requested: "Revision Requested",
    approved: "Approved",
    completed: "Completed",
    cancelled: "Cancelled",
    new: "New",
    quoted: "Quote Sent",
    accepted: "Accepted",
    converted: "Converted to Order",
    closed: "Closed",
    pending: "Pending",
    confirmed: "Confirmed",
    printing: "Printing",
    shipped: "Shipped",
    delivered: "Delivered",
    refunded: "Refunded",
    paid: "Paid",
    failed: "Failed",
  };
  return map[status] ?? status;
}

export function generateWhatsAppLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
