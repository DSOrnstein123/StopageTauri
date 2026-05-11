import { DockviewApi, themeLight } from "dockview-core";
import { DockviewReact } from "dockview";
import { components } from "./components";
import { tabComponents } from "./tabComponents";
import { useWorkspaceStore } from "@system/lib/dockview/useWorkspaceStore";

const loadDefaultLayout = (api: DockviewApi) => {
  api.addPanel({
    id: "welcome_panel",
    component: "tab",
    title: "Welcome",
  });
};

const Workspace = () => {
  const setDockApi = useWorkspaceStore((state) => state.setDockApi);

  return (
    <DockviewReact
      theme={themeLight}
      onReady={(readyEvent) => {
        const { api: readyApi } = readyEvent;
        const savedLayout = localStorage.getItem("workspace-layout");
        if (savedLayout) {
          try {
            readyApi.fromJSON(JSON.parse(savedLayout));
          } catch (error) {
            console.error("Failed to load layout:", error);
            loadDefaultLayout(readyApi);
          }
        } else {
          loadDefaultLayout(readyApi);
        }

        setDockApi(readyApi);

        readyApi.onDidLayoutChange(() => {
          const currentLayout = readyApi.toJSON();
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
