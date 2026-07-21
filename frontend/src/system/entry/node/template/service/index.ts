import { invoke } from "@tauri-apps/api/core";
import type { ApplyTemplatePayload } from "../types/applyTemplatePayload";
import type { NodeDetailMap } from "@system/plugin-manager/node";
import type { NodeType } from "@system/plugin-manager/plugin";

export const templateService = {
  applyTemplate: <N extends NodeType>(payload: ApplyTemplatePayload) =>
    invoke<NodeDetailMap<N>>("apply_template", {
      templateId: payload.templateId,
      targetId: payload.targetId,
    }),
};
