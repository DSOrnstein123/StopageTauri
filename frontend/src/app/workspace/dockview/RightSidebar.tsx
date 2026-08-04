import { DockviewReact, themeLight } from "dockview";
import { components } from "./constants/components";
import { dockviewWorkbenchHost } from "./WorkbenchHost";
import { WorkbenchZoneProvider } from "@system/workbench/core";

const RightSidebar = () => {
  return (
    <WorkbenchZoneProvider zone="right-sidebar">
      <DockviewReact
        theme={themeLight}
        onReady={(event) => {
          event.api.addPanel({
            id: "right-sidebar",
            component: "rightSidebar",
            title: "Sidebar Tab",
          });

          dockviewWorkbenchHost.registerZoneHost("right-sidebar", event.api);
        }}
        components={components}
      />
    </WorkbenchZoneProvider>
  );
};

export default RightSidebar;
