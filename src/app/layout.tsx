import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Mark Line - Business Services | مارك لاين - تحويل رؤيتك إلى واقع متكامل",
  description: "Transform your vision into an integrated reality | تحويل رؤيتك إلى واقع متكامل - خدمات أعمال متكاملة",
  keywords: "Business Services, Marketing, Events, Real Estate, Saudi Arabia, خدمات أعمال, تسويق, فعاليات",
  icons: {
    icon: '/styleguide/SVG/icon.svg',
    apple: '/styleguide/SVG/icon.svg',
  },
  openGraph: {
    title: "Mark Line - Business Services",
    description: "Transform your vision into an integrated reality | تحويل رؤيتك إلى واقع متكامل",
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
  },
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
