import { ReactNodeViewRenderer, CodeBlockLowlight } from "@system/lib/tiptap";
import CodeBlockView from "./CodeBlockView";

export const CustomCodeBlock = CodeBlockLowlight.extend({
  draggable: true,

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockView);
  },
});
