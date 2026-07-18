import { TYPE } from "../../../entries/nodes/document-template/identity";
import type { NodeListOptions } from "@system/features/node/shared/types";

export const DOCUMENT_TEMPLATE_FILTER: NodeListOptions = {
  includeKinds: ["template"],
  includeTypes: [TYPE],
};
