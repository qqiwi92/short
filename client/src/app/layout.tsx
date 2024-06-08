import type { Metadata } from "next";
import { Montserrat, Open_Sans, Unbounded } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});

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
      <body className={montserrat.className + " font px-2 py-20"}>
        <div className="relative mx-auto w-full max-w-6xl">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
