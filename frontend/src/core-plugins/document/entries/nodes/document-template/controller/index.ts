import { EditorController } from "@system/text-editor/controller";

class DocumentTemplateNodeController extends EditorController {}

export const createDocumentTemplateController = () =>
  new DocumentTemplateNodeController();
