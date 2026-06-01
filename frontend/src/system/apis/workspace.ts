import { workspaceService } from "@system/features/workspace/services";
import type { OpenTabParams } from "@system/features/workspace/types/tabParams";

export const workspaceApi = {
  openTab: (config: OpenTabParams) => workspaceService.openTab(config),
  navigate: (panelId: string, path: string) =>
    workspaceService.navigate(panelId, path),
};
