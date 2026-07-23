import { EditorController } from "@core-plugins/block-based-editor/provider/controller";

class DocumentNodeController extends EditorController {}

export const createDocumentController = () => new DocumentNodeController();
