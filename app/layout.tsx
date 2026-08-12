import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notes App",
  description: "Full Stack Notes App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="flex gap-4 p-4 bg-gray-100 border-b border-gray-300 shadow-sm sticky top-0 z-10 backdrop-blur-md bg-opacity-80 text-lg">
          <Link href="/">home</Link>
          {" | "}
          <Link href="/notes">notes</Link>
          {" | "}
          <Link href="/notes/new">create new</Link>
          {" | "}
          <Link href="/blogs">blogs</Link>
          {" | "}
          <Link href="/blogs/new">new blog</Link>
          {" | "}
          <Link href="/users">users</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
