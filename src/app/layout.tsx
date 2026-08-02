import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "DesignMyTee — Custom T-Shirt Printing, Done Right",
    template: "%s | DesignMyTee",
  },
  description:
    "Custom t-shirt printing in Kochi, Kerala. Submit your design idea, our expert designers handle everything — premium quality, delivered to your door.",
  keywords: [
    "custom t-shirt printing",
    "t-shirt printing Kochi",
    "custom apparel Kerala",
    "bulk t-shirt printing",
    "custom jersey printing",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DesignMyTee",
    title: "DesignMyTee — Custom T-Shirt Printing, Done Right",
    description:
      "Custom t-shirt printing in Kochi, Kerala. Upload your idea, our designers handle the rest.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DesignMyTee — Custom T-Shirt Printing",
    description: "Custom t-shirt printing done right. Kochi, Kerala.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.className} dark`}>
      <body className="min-h-screen bg-[#0A0A0A] text-white antialiased selection:bg-[#F05A22] selection:text-white transition-colors duration-300">
        <Navbar />
        <main className="">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
