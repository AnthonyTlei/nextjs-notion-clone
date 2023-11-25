import Sidebar from "@/components/sidebar/sidebar";
import { ReactNode } from "react";

interface WorkspaceLayoutProps {
  children: ReactNode;
  params: any;
}

const WorkspaceLayout = ({ children, params }: WorkspaceLayoutProps) => {
  return (
    <main className="flex h-screen w-screen overflow-hidden">
      <Sidebar params={params} className="inline-block w-screen sm:hidden" />
      <div className="dark:boder-Neutrals-12/70 relative w-full overflow-scroll border-l-[1px]">
        {children}
      </div>
    </main>
  );
};

export default WorkspaceLayout;
