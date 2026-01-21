import ClarityAnalytics from '@/components/ClarityAnalytics';
import PrivacyConsent from '@/components/PrivacyConsent';

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Microsoft Clarity Analytics for Business Pages */}
      <ClarityAnalytics respectPrivacy={true} />

      {/* Privacy Consent Banner for GDPR Compliance */}
      <PrivacyConsent />

      {children}
    </>
  );
}