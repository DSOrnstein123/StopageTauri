import { EditorController } from "@core-plugins/block-editor/provider/block-editor-provider/controller";
import type { NodeControllerContext } from "@system/entry/categories/node/core/types/controllerContext";

class DocumentNodeController extends EditorController {}

export const createDocumentController = (context: NodeControllerContext) =>
  new DocumentNodeController(context.nodeId);
