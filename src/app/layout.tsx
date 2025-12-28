import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex',
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-ibm-plex-arabic',
});

export const metadata: Metadata = {
  title: "Orbit | المدار التقني",
  description: "Pioneering integrated solutions that elevate brands and transform visions into reality | حلول متكاملة رائدة ترفع العلامات التجارية وتحول الرؤى إلى واقع",
  keywords: "ORBIT, Business Solutions, Marketing, Events, Real Estate, Saudi Arabia, Integrated Services",
  icons: {
    icon: '/logo/شعار المدار-03.svg',
    apple: '/logo/شعار المدار-03.svg',
  },
  openGraph: {
    title: "ORBIT - Launch Your Success",
    description: "Pioneering integrated solutions that elevate brands and transform visions into reality",
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
    <html lang="en" className={`scroll-smooth overflow-x-hidden ${ibmPlexSans.variable} ${ibmPlexSansArabic.variable}`}>
      <body className="antialiased transition-colors duration-300 overflow-x-hidden" style={{ width: '100%', maxWidth: '100vw' }}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
