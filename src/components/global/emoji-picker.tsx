"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

interface EmojipickerProps {
  children: ReactNode;
  getValue?: (emoji: string) => void;
}

const Emojipicker = ({ children, getValue }: EmojipickerProps) => {
  const Picker = dynamic(() => import("emoji-picker-react"));
  const onClick = (selectedEmoji: any) => {
    if (getValue) {
      getValue(selectedEmoji.emoji);
    }
  };

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
        <PopoverContent className="border-none p-0">
          <Picker onEmojiClick={onClick} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Emojipicker;
