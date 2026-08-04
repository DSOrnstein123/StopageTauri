import { DockviewReact, themeLight } from "dockview";
import { components } from "./constants/components";
import { dockviewWorkbenchHost } from "./WorkbenchHost";
import { WorkbenchZoneProvider } from "@system/workbench/core";

const LeftSidebar = () => {
  return (
    <WorkbenchZoneProvider zone="left-sidebar">
      <DockviewReact
        theme={themeLight}
        onReady={(event) => {
          event.api.addPanel({
            id: "tab1",
            component: "fileList",
            title: "Sidebar Tab",
          });

          dockviewWorkbenchHost.registerZoneHost("left-sidebar", event.api);
        }}
        components={components}
      />
    </WorkbenchZoneProvider>
  );
};

export default LeftSidebar;
