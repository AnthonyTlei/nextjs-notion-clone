"use client";

// TODO : Fix bug, create folder, create file, move folder trash, delete folder from quill editor popup, usage still counted.

import { MAX_FOLDERS_FREE_PLAN } from "@/lib/constants";
import { useAppState } from "@/lib/providers/state-provider";
import { Subscription } from "@/lib/supabase/supabase.types";
import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import CypressDiamondIcon from "../icons/cypressDiamongIcon";

interface PlanUsageProps {
  foldersLength: number;
  subscription: Subscription | null;
}

const PlanUsage = ({ foldersLength, subscription }: PlanUsageProps) => {
  const { workspaceId, state } = useAppState();
  const [usagePercentage, setUsagePercentage] = useState(
    (foldersLength / MAX_FOLDERS_FREE_PLAN) * 100,
  );

  useEffect(() => {
    const stateFoldersLength = state.workspaces.find(
      (workspace) => workspace.id === workspaceId,
    )?.folders.length;
    if (stateFoldersLength === undefined) return;
    setUsagePercentage((stateFoldersLength / MAX_FOLDERS_FREE_PLAN) * 100);
  }, [state, workspaceId]);

  return (
    <article className="mb-4">
      {subscription?.status !== "active" && (
        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
          <div className="h-4 w-4">
            <CypressDiamondIcon />
          </div>
          <div className="flex w-full items-center justify-between">
            <div>Free Plan</div>
            <small>{usagePercentage.toFixed(0)}% / 100%</small>
          </div>
        </div>
      )}
      {subscription?.status !== "active" && (
        <Progress value={usagePercentage} className="h-1" />
      )}
    </article>
  );
};

export default PlanUsage;
