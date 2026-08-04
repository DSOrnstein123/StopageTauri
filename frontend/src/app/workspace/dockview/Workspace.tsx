import { themeLight } from "dockview-core";
import { DockviewReact } from "dockview";
import { components } from "./constants/components";
import { tabComponents } from "./constants/tabComponents";
import { WorkbenchZoneProvider } from "@system/workbench/core";
import { dockviewWorkbenchHost } from "./WorkbenchHost";

const Workspace = () => {
  return (
    <WorkbenchZoneProvider zone="workspace">
      <DockviewReact
        theme={themeLight}
        onReady={(event) => {
          dockviewWorkbenchHost.registerZoneHost("workspace", event.api);
        }}
        components={components}
        tabComponents={tabComponents}
      />
    </WorkbenchZoneProvider>
  );
};

export default Workspace;
