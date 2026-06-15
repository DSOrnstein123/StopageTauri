import type { TabApiMap } from "@system/features/workspace/registries/tabApi";
import { workspaceTabRegistry } from "@system/features/workspace/registries/workspaceContentRegistry";
import { workspaceService } from "@system/features/workspace/services";
import type { NavigateTarget } from "@system/features/workspace/types/navigate";
import type { OpenTabParams } from "@system/features/workspace/types/tabParams";
import type { NodeType } from "@system/registries/node";

export const workspaceApi = {
  openTab: (config: OpenTabParams) => workspaceService.openTab(config),
  navigate: (panelId: string, target: NavigateTarget) =>
    workspaceService.navigate(panelId, target),
  registerTabApi: <N extends NodeType>(tabId: string, api: TabApiMap<N>) =>
    workspaceTabRegistry.register(tabId, api),
  getTabApi: <N extends NodeType>(tabId: string) =>
    workspaceTabRegistry.getApi<N>(tabId),
};
