import type { ComponentType, ReactNode } from "react";
import { type JSONContent } from "@system/lib/tiptap";

export interface ViewProps {
  content: JSONContent;
  onContentChange: (content: JSONContent) => void;
  emptyPlaceholder?: ReactNode;
}

export type ViewComponent = ComponentType<ViewProps>;
