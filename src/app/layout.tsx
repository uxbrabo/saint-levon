import type { Metadata } from "next";
import { Archivo, DM_Sans } from "next/font/google";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "@/context/ThemeProvider";
import { CartProvider } from "@/context/CartProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAINT LEVON — Lifestyle Surf & Sport",
  description:
    "SAINT LEVON. Roupa para quem vive na água e na rua. Compre a coleção atual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-theme="dark"
      className={`${archivo.variable} ${dmSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-bg text-fg" id="top">
        <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          <ThemeProvider>
            <CartProvider>
              <CustomCursor />
              <Header />
              {children}
              <Footer />
              <CartDrawer />
            </CartProvider>
          </ThemeProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
