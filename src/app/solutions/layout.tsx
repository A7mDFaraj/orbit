import ClarityAnalytics from '@/components/ClarityAnalytics';

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Microsoft Clarity Analytics for Solutions Pages */}
      <ClarityAnalytics respectPrivacy={true} />
      {children}
    </>
  );
}