import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlockView from "./CodeBlockView";

export const CustomCodeBlock = CodeBlockLowlight.extend({
  draggable: true,

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockView);
  },
});
