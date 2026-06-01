import { DockviewApi, themeLight } from "dockview-core";
import { DockviewReact } from "dockview";
import { components } from "./components";
import { tabComponents } from "./tabComponents";
import { workspaceService } from "@system/features/workspace/services";

const loadDefaultLayout = (api: DockviewApi) => {
  api.addPanel({
    id: "welcome_panel",
    component: "tab",
    title: "Welcome",
  });
};

const Workspace = () => {
  return (
    <DockviewReact
      theme={themeLight}
      onReady={(readyEvent) => {
        const { api: dockApi } = readyEvent;
        const savedLayout = localStorage.getItem("workspace-layout");
        if (savedLayout) {
          try {
            dockApi.fromJSON(JSON.parse(savedLayout));
          } catch (error) {
            console.error("Failed to load layout:", error);
            loadDefaultLayout(dockApi);
          }
        } else {
          loadDefaultLayout(dockApi);
        }

        workspaceService.setEngine({
          openTab: (params) => {
            const panelId = `${Date.now()}`;
            const tabParams =
              params.mode == "dynamic"
                ? { nodeId: params.nodeId, type: params.type, mode: "dynamic" }
                : { type: params.type, mode: "static" };

            dockApi.addPanel({
              id: panelId,
              title: params.title,
              tabComponent: "workspace",
              component: "tab",
              params: tabParams,
            });
          },

          navigate: (panelId, path) => {
            const mainPanel = dockApi.getPanel(panelId);
            if (mainPanel) {
              mainPanel.api.updateParameters({ fileId: path });
            }
          },
        });

        dockApi.onDidLayoutChange(() => {
          const currentLayout = dockApi.toJSON();
          localStorage.setItem(
            "workspace-layout",
            JSON.stringify(currentLayout),
          );
        });
      }}
      components={components}
      tabComponents={tabComponents}
    />
  );
};

export default Workspace;
