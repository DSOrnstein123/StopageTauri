import type { HistoryEntry } from "@system/workbench/tab/types/navigation";
import type { WorkbenchHost } from "@system/workbench/core/types/workbenchHost";
import type { DockviewApi, SerializedDockview } from "dockview-core";
import type { JsonObject } from "@system/shared/types/json";
import { SerializedDockviewSchema, serializeDockviewLayout } from "./schema";
import type { TabParams } from "./types";
import type { OpenTabParams } from "@system/workbench/tab/types/tabParams";
import type { WorkbenchZone } from "@system/workbench/core/types/workbenchZone";
import type { TabRecord } from "@system/workbench/core/types/tabRecord";
import type { IDisposable } from "dockview-core/dist/cjs/lifecycle";

type ActiveTabChangeListener = (
  zone: WorkbenchZone,
  tabId: string | null,
) => void;

type NavigateListener = (tabId: string) => void;

class DockviewWorkbenchHost implements WorkbenchHost {
  private zoneHosts = new Map<WorkbenchZone, DockviewApi>();

  private readonly activeTabListeners = new Set<ActiveTabChangeListener>();
  private readonly navigateListeners = new Set<NavigateListener>();

  private readonly zoneSubscriptions = new Map<WorkbenchZone, IDisposable>();

  registerZoneHost(zone: WorkbenchZone, zoneHost: DockviewApi) {
    this.zoneSubscriptions.clear();

    this.zoneHosts.set(zone, zoneHost);

    this.zoneHosts.forEach((zoneHost, zone) => {
      const subscription = zoneHost.onDidActivePanelChange((panel) => {
        if (!panel) return;

        this.activeTabListeners.forEach((listener) => listener(zone, panel.id));
      });

      this.zoneSubscriptions.set(zone, subscription);
    });
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

  private getZoneHost(zone: WorkbenchZone) {
    const host = this.zoneHosts.get(zone);

    if (!host) {
      throw new Error(`Zone ${zone} does not exist`);
    }

    return host;
  }

  private getPanel(id: string, zone: WorkbenchZone = "workspace") {
    const host = this.getZoneHost(zone);
    const panel = host.getPanel(id);

    if (!panel) {
      throw new Error(`Panel ${id} does not exist`);
    }

    return panel;
  }

  setTitle(id: string, newTitle: string) {
    const panel = this.getPanel(id);
    panel?.api.setTitle(newTitle);
  }

  openTab(record: TabRecord, params: OpenTabParams) {
    const host = this.getZoneHost(record.zone);

    const panel = host.addPanel({
      id: record.tab.id,
      title: params.title,
      component: "tab",
      tabComponent: "header",
      params: this.toDockviewParams(params),
    });

    panel.api.onDidParametersChange(() =>
      this.navigateListeners.forEach((listener) => listener(record.tab.id)),
    );
  }

  closeTab(zone: WorkbenchZone, id: string) {
    const host = this.getZoneHost(zone);
    const panel = this.getPanel(id);
    host.removePanel(panel);
  }

  navigate(id: string, entry: HistoryEntry) {
    const panel = this.getPanel(id);
    panel?.api.updateParameters(this.toDockviewParams(entry));
  }

  applyLayout(layout: JsonObject) {
    const parsed = SerializedDockviewSchema.parse(layout);
    this.zoneHosts.get("workspace").fromJSON(parsed as SerializedDockview);
  }

  loadDefaultLayout() {
    this.zoneHosts.forEach((z) =>
      z.addPanel({
        id: "welcome_panel",
        component: "tab",
        title: "Welcome",
      }),
    );
  }

  onNavigate(listener: NavigateListener) {
    this.navigateListeners.add(listener);

    return {
      dispose: () => this.navigateListeners.delete(listener),
    };
  }

  onActiveTabChange(listener: ActiveTabChangeListener) {
    this.activeTabListeners.add(listener);

    return {
      dispose: () => this.activeTabListeners.delete(listener),
    };
  }

  onLayoutChange(listener: (layout: JsonObject) => void) {
    this.zoneHosts.forEach((zoneHost) => {
      zoneHost.onDidLayoutChange(() => {
        listener(serializeDockviewLayout(zoneHost.toJSON()));
      });
    });
  }
}

export const dockviewWorkbenchHost = new DockviewWorkbenchHost();
