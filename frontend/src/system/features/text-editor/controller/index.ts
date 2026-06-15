import { Editor } from "@system/lib/tiptap";
import type { StoreApi } from "zustand";
import type { EditorStore } from "../stores/createEditorStore";
import { BaseController } from "@system/features/workspace/registries/baseController";

export class EditorController extends BaseController {
  private editor: Editor | null = null;
  private store: StoreApi<EditorStore> | null = null;

  setEditor(editor: Editor) {
    this.editor = editor;
  }

  setStore(store: StoreApi<EditorStore>) {
    this.store = store;
  }

  getEditor() {
    return this.editor;
  }

  getStore() {
    return this.store;
  }

  getTOC() {
    return this.store?.getState().tocContent;
  }
}
