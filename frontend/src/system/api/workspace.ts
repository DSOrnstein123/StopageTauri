import { workspaceService } from "@system/features/workspace/services";
import type { NavigateTarget } from "@system/features/workspace/types/navigate";
import type { OpenTabParams } from "@system/features/workspace/types/tabParams";

export const workspaceApi = {
  openTab: (config: OpenTabParams) => workspaceService.openTab(config),
  navigate: (panelId: string, target: NavigateTarget) =>
    workspaceService.navigate(panelId, target),
};
