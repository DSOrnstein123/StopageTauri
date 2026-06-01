import type { OpenTabParams } from "../types/tabParams";

export interface WorkspaceEngine {
  openTab: (params: OpenTabParams) => void;
  navigate: (panelId: string, path: string) => void;
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

  public navigate(panelId: string, path: string) {
    if (!this.engine) {
      return;
    }
    this.engine.navigate(panelId, path);
  }
}

export const workspaceService = new WorkspaceService();
