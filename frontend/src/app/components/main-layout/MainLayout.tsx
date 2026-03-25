import { SplitviewReact, type SplitviewReadyEvent } from "dockview";
import { Orientation } from "dockview-core";
import ActionBar from "../sidebar/ActionBar";
import LeftSidebar from "./LeftSidebar";
import Workspace from "./Workspace";

const MainLayout = () => {
  const onSplitviewReady = (event: SplitviewReadyEvent) => {
    const leftPane = event.api.addPanel({
      id: "left-pane",
      component: "leftDock",
      minimumSize: 100,
    });

    event.api.addPanel({
      id: "right-pane",
      component: "rightDock",
    });

    leftPane.api.setSize({ size: 200 });
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
          rightDock: Workspace,
        }}
      />
    </div>
  );
};

export default MainLayout;
