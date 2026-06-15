import { Editor } from "@system/lib/tiptap";

export interface DocumentNodeApi {
  getEditor: () => Editor;
}
