import { themeLight } from "dockview-core";
import { useWorkspaceStore } from "./useWorkspaceStore";
import { DockviewReact } from "dockview";
import { components } from "../components";
import { tabComponents } from "./tabComponents";
import type { PanelType } from "./panelRegistry";

const Workspace = () => {
  const setDockApi = useWorkspaceStore((state) => state.setDockApi);
  const setActivePanelInfo = useWorkspaceStore(
    (state) => state.setActivePanelInfo,
  );

  return (
    <DockviewReact
      theme={themeLight}
      onReady={(e) => {
        setDockApi(e.api);
        e.api.onDidActivePanelChange((e) => {
          setActivePanelInfo({
            id: e?.api.id || "",
            type: (e?.api.component as PanelType) || "none",
            fileId: e?.params?.documentId || "",
          });
        });
      }}
      components={components}
      tabComponents={tabComponents}
    />
  );
};

export default Workspace;
