import { mutationOptions } from "@tanstack/react-query";
import type { ApplyTemplatePayload } from "../types/applyTemplatePayload";
import { systemApi } from "@system/api";
import { nodeKeys } from "../../shared/keys";
import type { NodeType } from "@system/registries/plugin";
import { queryClient } from "@system/config/queryClient";

export const applyTemplateMutationOptions = <N extends NodeType>() =>
  mutationOptions({
    mutationKey: ["node", "template", "apply"],
    mutationFn: (payload: ApplyTemplatePayload) => {
      console.log(payload);
      return systemApi.node.template.applyTemplate<N>(payload);
    },

    onSuccess: (updatedNode) => {
      console.log(updatedNode);
      queryClient.setQueryData(nodeKeys.detail(updatedNode.id), updatedNode);

      //TODO: add setQuery to list
    },

    onError: (error) => {
      console.log(error);
    },
  });
