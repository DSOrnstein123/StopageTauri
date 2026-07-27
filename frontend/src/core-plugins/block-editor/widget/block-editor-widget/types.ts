import type { ComponentType, ReactNode } from "react";
import { type JSONContent } from "@system/lib/tiptap";
import type { LucideIcon } from "lucide-react";

export interface ViewProps {
  content: JSONContent;
  onContentChange: (content: JSONContent) => void;
  emptyPlaceholder?: ReactNode;
}

export type ViewComponent = ComponentType<ViewProps>;

export interface BubbleMenuAction {
  id: string;
  label: string;
  icon: LucideIcon;
  highlighted: boolean;
  action: () => void;
  separated?: boolean;
}
