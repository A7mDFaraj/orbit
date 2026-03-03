import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleTagManager from "@/components/GoogleTagManager";
import PrivacyConsent from "@/components/PrivacyConsent";

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
  title: "CorBit | شركة المدار",
  applicationName: "CorBit | شركة المدار",
  description: "Pioneering integrated solutions that elevate brands and transform visions into reality | حلول متكاملة رائدة ترفع العلامات التجارية وتحول الرؤى إلى واقع",
  keywords: "CorBit, ORBIT, Business Solutions, Marketing, Events, Real Estate, Saudi Arabia, Integrated Services",
  icons: {
    icon: '/logo/' + encodeURIComponent('شعار المدار-03.svg'),
    apple: '/logo/' + encodeURIComponent('شعار المدار-03.svg'),
  },
  openGraph: {
    title: "CorBit | شركة المدار",
    description: "Pioneering integrated solutions that elevate brands and transform visions into reality",
    siteName: "CorBit | شركة المدار",
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth overflow-x-hidden ${ibmPlexSans.variable} ${ibmPlexSansArabic.variable}`}>
      <body className="antialiased transition-colors duration-300 overflow-x-hidden" style={{ width: '100%', maxWidth: '100vw' }} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            {/* Google Tag Manager - Marketing & Analytics */}
            <GoogleTagManager gtmId="GTM-MKGST5S6" />

            {/* Privacy Consent Banner for GDPR Compliance */}
            <PrivacyConsent />

            {children}
          </LanguageProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
