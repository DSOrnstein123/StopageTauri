import LeftSidebar from "@app/workspace/dockview/LeftSidebar";
import ActionBar from "@app/shell/sidebar/ActionBar";
import {
  dockviewWorkbenchHost,
  DockviewWorkspace,
} from "@app/workspace/dockview/public";
import { SplitviewReact, type SplitviewReadyEvent } from "dockview";
import { Orientation } from "dockview-core";
import RightSidebar from "@app/workspace/dockview/RightSidebar";
import { systemApi } from "@system/api";

const MainLayout = () => {
  const onSplitviewReady = (event: SplitviewReadyEvent) => {
    const leftPane = event.api.addPanel({
      id: "left-pane",
      component: "leftDock",
      minimumSize: 100,
    });

    event.api.addPanel({
      id: "center-pane",
      component: "centerDock",
    });

    leftPane.api.setSize({ size: 200 });

    event.api.addPanel({
      id: "right-pane",
      component: "rightDock",
      size: 200,
      minimumSize: 100,
    });

    systemApi.workbench.init(dockviewWorkbenchHost);
  };

  return (
    <div className="flex h-screen w-screen">
      <ActionBar />

      <SplitviewReact
        orientation={"HORIZONTAL" as Orientation}
        className="dockview-theme-light flex-1"
        onReady={onSplitviewReady}
        components={{
          leftDock: LeftSidebar,
          centerDock: DockviewWorkspace,
          rightDock: RightSidebar,
        }}
      />
    </div>
  );
};

export default MainLayout;
