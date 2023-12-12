import { SubscriptionModalProvider } from "@/lib/providers/subscription-modal-provider";
import { ReactNode } from "react";

interface DashboardPageLayoutProps {
  children: ReactNode;
  params: any;
}

const DashboardPageLayout = async ({
  children,
  params,
}: DashboardPageLayoutProps) => {
  return (
    <main className="over-hidden flex h-screen">
      <SubscriptionModalProvider>{children}</SubscriptionModalProvider>
    </main>
  );
};

export default DashboardPageLayout;
