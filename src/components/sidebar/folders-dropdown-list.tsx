"use client";

import { useAppState } from "@/lib/providers/state-provider";
import { Folder } from "@/lib/supabase/supabase.types";
import { useEffect, useState } from "react";
import { Accordion } from "../ui/accordion";
import { PlusIcon } from "lucide-react";
import TooltipComponent from "../global/tooltip-component";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { v4 } from "uuid";
import { createFolder } from "@/lib/supabase/queries";
import { useToast } from "../ui/use-toast";
import Dropdown from "./Dropdown";
import useSupabaseRealtime from "@/lib/hooks/useSupabaseRealtime";
import { useSubscriptionModal } from "@/lib/providers/subscription-modal-provider";

interface FoldersDropdownListProps {
  workspaceFolders: Folder[];
  workspaceId: string;
}

const FoldersDropdownList = ({
  workspaceFolders,
  workspaceId,
}: FoldersDropdownListProps) => {
  useSupabaseRealtime();

  const { state, dispatch, folderId } = useAppState();
  const { open, setOpen } = useSubscriptionModal();
  const { toast } = useToast();
  const [folders, setFolders] = useState(workspaceFolders);
  const { subscription } = useSupabaseUser();

  useEffect(() => {
    if (workspaceFolders.length > 0) {
      dispatch({
        type: "SET_FOLDERS",
        payload: {
          workspaceId,
          folders: workspaceFolders.map((folder) => ({
            ...folder,
            files:
              state.workspaces
                .find((workspace) => workspace.id === workspaceId)
                ?.folders.find((f) => f.id === folder.id)?.files || [],
          })),
        },
      });
    }
  }, [workspaceFolders, workspaceId]);

  useEffect(() => {
    setFolders(
      state.workspaces.find((workspace) => workspace.id === workspaceId)
        ?.folders || [],
    );
  }, [state, workspaceId]);

  const addFolderHandler = async () => {
    if (folders.length >= 3 && !subscription) {
      setOpen(true);
      return;
    }
    const newFolder: Folder = {
      data: null,
      id: v4(),
      createdAt: new Date().toISOString(),
      title: "Untitled",
      iconId: "📄",
      inTrash: null,
      workspaceId,
      bannerUrl: "",
    };
    dispatch({
      type: "ADD_FOLDER",
      payload: { workspaceId, folder: { ...newFolder, files: [] } },
    });
    const { data, error } = await createFolder(newFolder);
    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Could not create the folder",
      });
    } else {
      toast({
        title: "Success",
        description: "Created folder.",
      });
    }
  };

  return (
    <>
      <div className="group/title sticky top-0 z-20 flex h-10  w-full items-center justify-between bg-background pr-4 text-Neutrals/neutrals-8">
        <span className="text-Neutrals-8 text-xs font-bold">FOLDERS</span>
        <TooltipComponent message="Create Folder">
          <PlusIcon
            onClick={addFolderHandler}
            size={16}
            className="hidden cursor-pointer group-hover/title:inline-block hover:dark:text-white"
          />
        </TooltipComponent>
      </div>
      <Accordion
        type="multiple"
        defaultValue={[folderId || ""]}
        className="pb-20"
      >
        {folders
          .filter((folder) => !folder.inTrash)
          .map((folder) => (
            <Dropdown
              key={folder.id}
              title={folder.title}
              listType="folder"
              id={folder.id}
              iconId={folder.iconId}
            />
          ))}
      </Accordion>
    </>
  );
};

export default FoldersDropdownList;
