import type { Metadata } from "next";
import { Montserrat, Open_Sans, Unbounded } from "next/font/google";
import "./globals.css";

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
      <body className={montserrat.className + " py-20 px-2 font"}>
        <div className="w-full max-w-6xl mx-auto relative">
          <div className="fixed right-0 top-0 left-0 z-50 flex items-center justify-center ">
            <p className={"text-3xl font-bold "}>shorter!</p>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
