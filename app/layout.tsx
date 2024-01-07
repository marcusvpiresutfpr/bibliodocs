import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";

import "./globals.css";
import Sidebar from "./sidebar";
import { Menu } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" data-theme="sunset">
      <body className={inter.className}>
        <Sidebar>{children}</Sidebar>
        <Toaster />
      </body>
    </html>
  );
}
