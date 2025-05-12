import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";

const titilliumWeb = Titillium_Web({
  variable: "--font-titillium-web",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Rick And Morty App",
  description: "Select Rick and Morty characters and find out their episodes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${titilliumWeb.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
