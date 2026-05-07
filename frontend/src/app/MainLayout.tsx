import Workspace from "@core/layout/dockview/Workspace";
import LeftSidebar from "@app/LeftSidebar";
import ActionBar from "@core/layout/sidebar/ActionBar";
import RightSidebar from "@app/RightSidebar";
import { SplitviewReact, type SplitviewReadyEvent } from "dockview";
import { Orientation } from "dockview-core";

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
          centerDock: Workspace,
          rightDock: RightSidebar,
        }}
      />
    </div>
  );
};

export default MainLayout;
