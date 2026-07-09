import type { HistoryEntry } from "@system/features/workspace/types/navigation";
import type { OpenTabParams } from "@system/features/workspace/types/tabParams";
import type { WorkspaceHost } from "@system/features/workspace/types/workspaceHost";
import type { DockviewApi } from "dockview-core";
import type { DockviewTabParams } from "./dockviewTabParams";
import { systemApi } from "@system/api";

export class DockviewWorkspaceHost implements WorkspaceHost {
  private readonly api: DockviewApi;
  constructor(dockviewApi: DockviewApi) {
    this.api = dockviewApi;
  }

  init() {
    this.restoreLayout();
    this.bindEvents();
  }

  private toDockviewParams(
    entry: HistoryEntry | OpenTabParams,
  ): DockviewTabParams {
    if (entry.entryCategory === "node") {
      return {
        entryCategory: "node",
        nodeId: entry.nodeId,
        nodeType: entry.nodeType,
      };
    }

    return {
      entryCategory: "tool",
      toolType: entry.toolType,
    };
  }

  private getPanel(id: string) {
    return this.api.getPanel(id);
  }

  setTitle(id: string, newTitle: string) {
    const panel = this.getPanel(id);
    panel?.api.setTitle(newTitle);
  }

  openTab(id: string, params: OpenTabParams) {
    this.api.addPanel({
      id: id,
      title: params.title,
      tabComponent: "workspace",
      component: "tab",
      params: this.toDockviewParams(params),
    });
  }

  closeTab(id: string) {
    const panel = this.getPanel(id);
    if (!panel) return;
    this.api.removePanel(panel);
  }

  navigate(id: string, entry: HistoryEntry) {
    const panel = this.getPanel(id);
    panel?.api.updateParameters(this.toDockviewParams(entry));
  }

  loadDefaultLayout() {
    this.api.addPanel({
      id: "welcome_panel",
      component: "tab",
      title: "Welcome",
    });
  }

  restoreLayout() {
    const savedLayout = localStorage.getItem("workspace-layout");
    if (savedLayout) {
      try {
        this.api.fromJSON(JSON.parse(savedLayout));
      } catch (error) {
        console.error("Failed to load layout:", error);
        this.loadDefaultLayout();
      }
    } else {
      this.loadDefaultLayout();
    }
  }

  bindEvents() {
    this.api.onDidActivePanelChange((e) => {
      if (!e) return;

      systemApi.workspace.setActiveTabId(e?.id);
    });

    this.api.onDidLayoutChange(() => {
      const currentLayout = this.api.toJSON();
      localStorage.setItem("workspace-layout", JSON.stringify(currentLayout));
    });
  }
}
