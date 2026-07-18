import { themeLight } from "dockview-core";
import { DockviewReact } from "dockview";
import { components } from "./components";
import { tabComponents } from "./tabComponents";
import { systemApi } from "@system/api";
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
