import { Editor } from "@system/lib/tiptap";
import type { EditorSlice } from "../stores/createEditorStore";
import { StoreController } from "@system/features/workspace/classes/baseController";

export class EditorController extends StoreController<EditorSlice> {
  private editor: Editor | null = null;
  readonly api = {
    getEditor: this.getEditor.bind(this),
    getTOC: this.getTOCContent.bind(this),
    setEditor: this.setEditor.bind(this),
  };

  setEditor(editor: Editor) {
    this.editor = editor;
  }

  getEditor() {
    return this.editor;
  }

  getTOCContent() {
    return this.store?.getState().tocContent;
  }

  override destroy() {
    this.editor?.destroy();
  }
}
