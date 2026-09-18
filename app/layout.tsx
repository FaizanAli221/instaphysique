import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadModal from "@/components/LeadModal";
import WhatsAppButton from "@/components/WhatsAppButton";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "InstaPhysique Roseville | Two Weeks on the Megaformer — $89",
  description:
    "New client intro offer at InstaPhysique Roseville: 8 Megaformer classes, a guest pass, and an InstaRoll lymphatic massage for $89. Low impact, high results.",
  openGraph: {
    title: "InstaPhysique Roseville | Two Weeks on the Megaformer — $89",
    description:
      "8 Megaformer classes, a guest pass, and a lymphatic massage session for $89. First-time clients only.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="font-sans flex min-h-screen flex-col bg-white text-slate-ink antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <LeadModal />
        <WhatsAppButton />
      </body>
    </html>
  );
}
