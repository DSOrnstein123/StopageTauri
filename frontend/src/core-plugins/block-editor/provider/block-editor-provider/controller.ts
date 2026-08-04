import { Editor } from "@system/lib/tiptap";
import type { EditorStore } from "./store";
import { NodeStoreController } from "@system/entry/categories/node/core/controller";

export class EditorController extends NodeStoreController<EditorStore> {
  private editor: Editor | null = null;

  readonly api = {
    ...this.nodeApi(),
    ...this.editorApi(),
  };

  protected editorApi() {
    return {
      getEditor: this.getEditor.bind(this),
      getTOC: this.getTOCContent.bind(this),
      setEditor: this.setEditor.bind(this),
    };
  }

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
