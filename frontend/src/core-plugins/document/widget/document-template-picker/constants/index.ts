import { TYPE } from "@core-plugins/document/entries/nodes/document-template/definition";
import type { NodeListOptions } from "@system/features/node/types";

export const DOCUMENT_TEMPLATE_FILTER: NodeListOptions = {
  includeKinds: ["template"],
  includeTypes: [TYPE],
};
