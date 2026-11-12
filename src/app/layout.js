import { Geist, Geist_Mono, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "HireLoop — Find Your Dream Job",
  description:
    "HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role faster.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#010103]">
        <Navbar />
        {children}
        <Toaster
          position="top-right"
          richColors={true}
          closeButton={true}
          expand={true}
          duration={4000}
        />
      </body>
    </html>
  );
}
