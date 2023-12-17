import { SubscriptionModalProvider } from "@/lib/providers/subscription-modal-provider";
import { getActiveProductsWithPrice } from "@/lib/supabase/queries";
import { ReactNode } from "react";

interface DashboardPageLayoutProps {
  children: ReactNode;
  params: any;
}

const DashboardPageLayout = async ({
  children,
  params,
}: DashboardPageLayoutProps) => {
  const { data: products, error } = await getActiveProductsWithPrice();
  if (error) throw new Error();
  return (
    <main className="over-hidden flex h-screen">
      <SubscriptionModalProvider products={products}>
        {children}
      </SubscriptionModalProvider>
    </main>
  );
};

export default DashboardPageLayout;
