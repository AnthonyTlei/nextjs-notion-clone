import Header from "@/components/landing-page/header";
import { ReactNode } from "react";

const HomePageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default HomePageLayout;
