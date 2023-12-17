import React, { ReactNode } from "react";
import CustomDialogTrigger from "../global/custom-dialog-trigger";
import TrashRestore from "./trash-restore";

interface TrashProps {
  children: ReactNode;
}

const Trash: React.FC<TrashProps> = ({ children }) => {
  return (
    <CustomDialogTrigger header="Trash" content={<TrashRestore />}>
      {children}
    </CustomDialogTrigger>
  );
};

export default Trash;
