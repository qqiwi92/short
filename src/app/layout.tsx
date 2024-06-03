import type { Metadata } from "next";
import {Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Shorter",
  description: "Created by LEMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"font-montserrat py-20 px-2 font"}>
        <div className="w-full max-w-6xl mx-auto">

        {children}
        </div>
        </body>
    </html>
  );
}
