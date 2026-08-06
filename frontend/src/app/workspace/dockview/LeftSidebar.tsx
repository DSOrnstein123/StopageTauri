import { DockviewReact, themeLight } from "dockview";
import { components } from "./constants/components";
import { dockviewWorkbenchHost } from "./WorkbenchHost";
import { WorkbenchZoneProvider } from "@system/workbench/core";
import { systemApi } from "@system/api";
import { tabComponents } from "./constants/tabComponents";

const LeftSidebar = () => {
  return (
    <WorkbenchZoneProvider zone="left-sidebar">
      <DockviewReact
        theme={themeLight}
        onReady={(event) => {
          dockviewWorkbenchHost.registerZoneHost("left-sidebar", event.api);

          systemApi.workbench.openTab({
            zone: "left-sidebar",
            kind: "entry",
            entryCategory: "tool",
            toolType: "file-explorer",
          });
        }}
        components={components}
        tabComponents={tabComponents}
      />
    </WorkbenchZoneProvider>
  );
};

export default LeftSidebar;
