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
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if consent has already been given
    const checkExistingConsent = () => {
      const consent = localStorage.getItem('cookie-consent');
      const hasConsent = consent === 'accepted';

      setConsentGiven(hasConsent);
      setShowBanner(!hasConsent);
    };

    checkExistingConsent();
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    document.cookie = 'cookie-consent=accepted; path=/; max-age=31536000'; // 1 year

    setConsentGiven(true);
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

    setConsentGiven(false);
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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t shadow-lg">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">🍪 نحترم خصوصيتك</CardTitle>
          <CardDescription>
            نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا وتحليل حركة المرور
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-sm text-gray-600 mb-4">
            <p>
              نستخدم Google Tag Manager وأدوات التحليل لتحسين تجربتك وفهم كيفية استخدام الموقع.
              هذا يساعدنا في تقديم خدمات أفضل مخصصة لك.
            </p>
            <p className="mt-2">
              يمكنك إدارة تفضيلاتك في أي وقت من خلال إعدادات المتصفح.
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
              className="px-6 bg-[#7A1E2E] hover:bg-[#7A1E2E]/90"
            >
              قبول
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}