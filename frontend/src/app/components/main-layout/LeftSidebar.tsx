import { DockviewReact, themeLight } from "dockview";
import { components } from "./components";

const LeftSidebar = () => {
  return (
    <DockviewReact
      theme={themeLight}
      onReady={(e) => {
        e.api.addPanel({
          id: "tab1",
          component: "fileList",
          title: "Sidebar Tab",
        });
      }}
      components={components}
    />
  );
};

export default LeftSidebar;
