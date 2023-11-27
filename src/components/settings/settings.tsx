import { ReactNode } from "react";
import CustomDialogTrigger from "../global/custom-dialog-trigger";
import SettingsForm from "./settings-form";

interface SettingsProps {
  children: ReactNode;
}

const Settings = ({ children }: SettingsProps) => {
  return (
    <CustomDialogTrigger header="Settings" content={<SettingsForm />}>
      {children}
    </CustomDialogTrigger>
  );
};

export default Settings;
