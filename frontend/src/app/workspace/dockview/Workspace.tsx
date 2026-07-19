import { themeLight } from "dockview-core";
import { DockviewReact } from "dockview";
import { systemApi } from "@system/api";
import { components } from "./constants/components";
import { tabComponents } from "./constants/tabComponents";
import { DockviewWorkspaceHost } from "./WorkspaceHost";

const Workspace = () => {
  return (
    <DockviewReact
      theme={themeLight}
      onReady={(readyEvent) => {
        const { api: dockApi } = readyEvent;
        const dockviewWorkspaceHost = new DockviewWorkspaceHost(dockApi);
        systemApi.workspace.setHost(dockviewWorkspaceHost);
        dockviewWorkspaceHost.init();
        systemApi.workspace.init();
      }}
      components={components}
      tabComponents={tabComponents}
    />
  );
};

export default Workspace;
