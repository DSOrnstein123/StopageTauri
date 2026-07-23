import type { NodeListOptions } from "@system/entry/categories/node/core/types/payload";
import { TYPE } from "../../../entries/nodes/document-template/definition";

export const DOCUMENT_TEMPLATE_FILTER: NodeListOptions = {
  includeKinds: ["template"],
  includeTypes: [TYPE],
};
