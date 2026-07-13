import { EditorController } from "@system/features/text-editor/controller";

class DocumentTemplateNodeController extends EditorController {}

export const createDocumentTemplateController = () =>
  new DocumentTemplateNodeController();
