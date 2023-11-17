import { ReactNode } from "react";

interface DashboardPageLayoutProps {
  children: ReactNode;
  params: any;
}

const DashboardPageLayout = ({
  children,
  params,
}: DashboardPageLayoutProps) => {
  return <main className="flex h-screen overflow-hidden">{children}</main>;
};

export default DashboardPageLayout;
