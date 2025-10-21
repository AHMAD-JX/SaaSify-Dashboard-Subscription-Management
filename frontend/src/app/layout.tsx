import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { UserProvider } from "@/contexts/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaaSify - Smart Dashboard for Subscription Management",
  description: "Take control of your subscriptions with our intelligent dashboard. Track, manage, and optimize your recurring payments with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {/* Solid background handled by theme tokens via globals.css */}

        <UserProvider>
          <SidebarProvider>
            <Navbar />

            <main className="relative z-10 min-h-screen">
              {children}
            </main>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
