import { Editor } from "@system/lib/tiptap";
import type { EditorStore } from "../stores/createEditorStore";
import { NodeStoreController } from "@system/features/node/shared/controller";

export class EditorController extends NodeStoreController<EditorStore> {
  private editor: Editor | null = null;
  get api() {
    return {
      ...this.nodeApi(),
      ...this.editorApi(),
    };
  }

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
