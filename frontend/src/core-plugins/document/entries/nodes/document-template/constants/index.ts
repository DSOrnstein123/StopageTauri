import type { NodeListOptions } from "@system/entry/categories/node/core/types/payload";
import { TYPE } from "../definition";

export const DOCUMENT_TEMPLATE_CONFIG: NodeListOptions = {
  includeKinds: ["template"],
  includeTypes: [TYPE],
};
