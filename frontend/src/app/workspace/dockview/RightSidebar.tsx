import { DockviewReact, themeLight } from "dockview";
import { components } from "./constants/components";
import { dockviewWorkbenchHost } from "./WorkbenchHost";
import { WorkbenchZoneProvider } from "@system/workbench/core";
import { tabComponents } from "./constants/tabComponents";

const RightSidebar = () => {
  return (
    <WorkbenchZoneProvider zone="right-sidebar">
      <DockviewReact
        theme={themeLight}
        onReady={(event) => {
          dockviewWorkbenchHost.registerZoneHost("right-sidebar", event.api);
        }}
        components={components}
        tabComponents={tabComponents}
      />
    </WorkbenchZoneProvider>
  );
};

export default RightSidebar;
