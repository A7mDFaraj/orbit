import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Mark Line - Creative Marketing Solutions | مارك لاين - حلول تسويقية إبداعية",
  description: "Leading Saudi entity in creative marketing solutions | كيان سعودي رائد في الحلول التسويقية الإبداعية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body className="antialiased transition-colors duration-300 overflow-x-hidden" style={{ width: '100%', maxWidth: '100vw' }}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
