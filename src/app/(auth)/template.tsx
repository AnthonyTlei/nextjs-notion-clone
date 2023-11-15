import { ReactNode } from "react";

interface TemplateProps {
  children: ReactNode;
}

const Template = ({ children }: TemplateProps) => {
  return <div className="flex h-screen justify-center p-6">{children}</div>;
};

export default Template;
