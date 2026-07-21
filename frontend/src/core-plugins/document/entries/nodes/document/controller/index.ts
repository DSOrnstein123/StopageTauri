import { EditorController } from "@system/text-editor/controller";

class DocumentNodeController extends EditorController {}

export const createDocumentController = () => new DocumentNodeController();
