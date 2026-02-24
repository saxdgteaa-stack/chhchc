import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grace Community Church - Management System",
  description:
    "Church management system for members, events, attendance, finance, and messaging.",
  keywords: [
    "Church",
    "Management",
    "Members",
    "Events",
    "Attendance",
    "Finance",
    "Ministry",
  ],
  authors: [{ name: "Grace Community Church" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Grace Community Church",
    description: "Church Management System",
    siteName: "Grace Community Church",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
