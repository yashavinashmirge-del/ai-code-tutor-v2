
////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : layout.tsx
// Module       : Root Application Layout
// Description  : Defines the common HTML structure,
//                fonts, metadata and global styling.
//
////////////////////////////////////////////////////////////

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Configure the primary application font.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Configure the monospace font for code.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Application metadata displayed by the browser.
export const metadata: Metadata = {
  title: "AI Code Tutor & Analyzer",
  description: "Learn, build and understand code with AI.",
};

// Root layout wraps every page in the application.
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
