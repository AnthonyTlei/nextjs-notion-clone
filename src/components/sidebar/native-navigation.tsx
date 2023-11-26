import Link from "next/link";
import { twMerge } from "tailwind-merge";
import CypressHomeIcon from "../icons/cypressHomeIcon";
import CypressSettingsIcon from "../icons/cypressSettingsIcon";
import CypressTrashIcon from "../icons/cypressTrashIcon";

interface NativeNavigationProps {
  myWorkspaceId: string;
  className?: string;
}

const NativeNavigation = ({
  myWorkspaceId,
  className,
}: NativeNavigationProps) => {
  return (
    <nav className={twMerge("my-2", className)}>
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            className="group/native flex gap-2 text-Neutrals/neutrals-7 transition-all"
            href={`/dashboard/${myWorkspaceId}`}
          >
            <CypressHomeIcon />
            <span>My Workspace</span>
          </Link>
        </li>
        <li className="group/native flex cursor-pointer gap-2 text-Neutrals/neutrals-7 transition-all">
          <CypressSettingsIcon />
          <span>Settings</span>
        </li>
        <li className="group/native flex gap-2 text-Neutrals/neutrals-7 transition-all">
          <CypressTrashIcon />
          <span>Trash</span>
        </li>
      </ul>
    </nav>
  );
};

export default NativeNavigation;
