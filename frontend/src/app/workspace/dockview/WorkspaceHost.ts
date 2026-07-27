import type { HistoryEntry } from "@system/workbench/tab/types/navigation";
import type { WorkspaceHost } from "@system/workbench/workspace/types/workspaceHost";
import type { DockviewApi, SerializedDockview } from "dockview-core";
import { systemApi } from "@system/api";
import type { JsonObject } from "@system/shared/types/json";
import { SerializedDockviewSchema, serializeDockviewLayout } from "./schema";
import type { TabParams } from "./types";
import type { OpenTabParams } from "@system/workbench/tab/types/tabParams";

export class DockviewWorkspaceHost implements WorkspaceHost {
  private readonly api: DockviewApi;
  constructor(dockviewApi: DockviewApi) {
    this.api = dockviewApi;
  }

  init() {
    this.bindEvents();
  }

  private toDockviewParams(entry: HistoryEntry | OpenTabParams): TabParams {
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

  applyLayout(layout: JsonObject) {
    const parsed = SerializedDockviewSchema.parse(layout);
    this.api.fromJSON(parsed as SerializedDockview);
  }

  loadDefaultLayout() {
    this.api.addPanel({
      id: "welcome_panel",
      component: "tab",
      title: "Welcome",
    });
  }

  bindEvents() {
    this.api.onDidActivePanelChange((panel) => {
      if (!panel) return;

      systemApi.workspace.setActiveTabId(panel.id);
    });
  }

  onLayoutChange(listener: (layout: JsonObject) => void) {
    this.api.onDidLayoutChange(() => {
      listener(serializeDockviewLayout(this.api.toJSON()));
    });
  }
}
