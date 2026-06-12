import type { NavigateTarget } from "../types/navigate";
import type { OpenTabParams } from "../types/tabParams";

export interface WorkspaceEngine {
  openTab: (params: OpenTabParams) => void;
  navigate: (panelId: string, path: NavigateTarget) => void;
}

class WorkspaceService {
  private engine: WorkspaceEngine | null = null;

  public setEngine(engine: WorkspaceEngine) {
    this.engine = engine;
  }

  public openTab(params: OpenTabParams) {
    if (!this.engine) {
      return;
    }
    this.engine.openTab(params);
  }

  public navigate(panelId: string, target: NavigateTarget) {
    if (!this.engine) {
      return;
    }
    this.engine.navigate(panelId, target);
  }
}

export const workspaceService = new WorkspaceService();
