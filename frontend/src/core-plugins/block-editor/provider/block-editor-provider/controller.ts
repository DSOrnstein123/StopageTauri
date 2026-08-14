import { Editor } from "@system/lib/tiptap";
import type { EditorStore } from "./store";
import { NodeStoreController } from "@system/entry/categories/node/core/controller";

export class EditorController extends NodeStoreController<EditorStore> {
  private editor: Editor | null = null;
  private readonly listeners = new Set<() => void>();

  readonly api = {
    ...this.nodeApi(),
    ...this.editorApi(),
  };

  protected editorApi() {
    return {
      getEditor: this.getEditor.bind(this),
      setEditor: this.setEditor.bind(this),
      subcribeEditor: this.subcribeEditor.bind(this),
    };
  }

  getEditor() {
    return this.editor;
  }

  setEditor(editor: Editor) {
    this.editor = editor;

    this.listeners.forEach((listener) => listener());
  }

  subcribeEditor(listener: () => void) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  override destroy() {
    this.editor?.destroy();
  }
}
