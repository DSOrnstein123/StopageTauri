import { DockviewApi, themeLight } from "dockview-core";
import { useWorkspaceStore } from "./useWorkspaceStore";
import { DockviewReact } from "dockview";
import { components } from "./components";
import { tabComponents } from "./tabComponents";

const loadDefaultLayout = (api: DockviewApi) => {
  api.addPanel({
    id: "welcome_panel",
    component: "document",
    title: "Welcome",
  });
};

const Workspace = () => {
  const setDockApi = useWorkspaceStore((state) => state.setDockApi);
  const setActivePanelInfo = useWorkspaceStore(
    (state) => state.setActivePanelInfo,
  );

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

        readyApi.onDidActivePanelChange((panelEvent) => {
          if (!panelEvent) {
            setActivePanelInfo(null);
            return;
          }

          const { api: panelApi } = panelEvent;
          setActivePanelInfo({
            id: panelApi.id || "",
            type: "document",
            params: panelEvent.params || null,
          });
        });
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
