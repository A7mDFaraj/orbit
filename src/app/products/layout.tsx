import ClarityAnalytics from '@/components/ClarityAnalytics';

export default function BusinessProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Microsoft Clarity Analytics for Business Products */}
      <ClarityAnalytics />
      {children}
    </>
  );
}