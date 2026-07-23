import { DockviewReact, themeLight } from "dockview";
import { components } from "../workspace/dockview/constants/components";

const RightSidebar = () => {
  return (
    <DockviewReact
      theme={themeLight}
      onReady={(e) => {
        e.api.addPanel({
          id: "right-sidebar",
          component: "rightSidebar",
          title: "Sidebar Tab",
        });
      }}
      components={components}
    />
  );
};

export default RightSidebar;
