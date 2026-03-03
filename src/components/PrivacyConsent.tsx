'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/business/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/business/ui/card';

interface PrivacyConsentProps {
  onConsentChange?: (consent: boolean) => void;
}

/**
 * Privacy Consent Banner for GDPR compliance
 * Manages cookie consent and triggers Clarity initialization
 */
export default function PrivacyConsent({ onConsentChange }: PrivacyConsentProps) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const checkExistingConsent = () => {
      const consent = localStorage.getItem('cookie-consent');
      const hasConsent = consent === 'accepted';

      setShowBanner(!hasConsent);
    };

    checkExistingConsent();
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    document.cookie = 'cookie-consent=accepted; path=/; max-age=31536000'; // 1 year

    setShowBanner(false);

    // Dispatch custom event for Clarity component
    window.dispatchEvent(new CustomEvent('cookie-consent-changed', {
      detail: { consent: true }
    }));

    onConsentChange?.(true);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    document.cookie = 'cookie-consent=declined; path=/; max-age=31536000';

    setShowBanner(false);

    // Dispatch custom event for Clarity component
    window.dispatchEvent(new CustomEvent('cookie-consent-changed', {
      detail: { consent: false }
    }));

    onConsentChange?.(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
      <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full bg-[#7A1E2E]/30 blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[#104E8B]/30 blur-3xl animate-pulse" />

      <div className="relative h-full w-full flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl bg-white/95 shadow-2xl border border-white/80 animate-in fade-in zoom-in-95 duration-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-[#161616]">نحترم خصوصيتك</CardTitle>
            <CardDescription className="text-base text-gray-700">
              نستخدم ملفات تعريف الارتباط وتقنيات القياس لتحسين الأداء وتقديم تجربة أدق لكل زائر.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-sm text-gray-700 mb-5 leading-7">
              <p>
                بموافقتك، نفعّل أدوات التحليل مثل Google Tag Manager لفهم سلوك الاستخدام وتطوير المحتوى والخدمات.
              </p>
              <p className="mt-2">
                يمكنك رفض التتبع الآن أو تغيير قرارك لاحقاً من إعدادات المتصفح.
              </p>
            </div>
            <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="px-6"
            >
              رفض
            </Button>
            <Button
              onClick={handleAccept}
              className="px-6 bg-[#7A1E2E] hover:bg-[#7A1E2E]/90 text-white"
            >
              قبول
            </Button>
          </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
