import { EditorController } from "@core-plugins/block-editor/provider/block-editor-provider/controller";

class DocumentNodeController extends EditorController {}

export const createDocumentController = () => new DocumentNodeController();
