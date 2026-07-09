import { EditorController } from "@system/features/text-editor/controller";

class DocumentNodeController extends EditorController {}

export const createDocumentController = () => new DocumentNodeController();
