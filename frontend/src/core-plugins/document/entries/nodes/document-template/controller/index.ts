import { EditorController } from "@core-plugins/block-based-editor/provider/controller";

class DocumentTemplateNodeController extends EditorController {}

export const createDocumentTemplateController = () =>
  new DocumentTemplateNodeController();
