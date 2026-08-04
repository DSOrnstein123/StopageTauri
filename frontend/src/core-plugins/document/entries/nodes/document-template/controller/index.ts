import { EditorController } from "@core-plugins/block-editor/provider/block-editor-provider/controller";

class DocumentTemplateNodeController extends EditorController {}

export const createDocumentTemplateController = () =>
  new DocumentTemplateNodeController();
