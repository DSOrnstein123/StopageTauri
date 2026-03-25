import { themeLight } from "dockview-core";
import { useWorkspaceStore } from "./useWorkspaceStore";
import { DockviewReact } from "dockview";
import { components } from "../components";
import { tabComponents } from "./tabComponents";

const Workspace = () => {
  const setDockApi = useWorkspaceStore((state) => state.setDockApi);

  return (
    <DockviewReact
      theme={themeLight}
      onReady={(e) => {
        setDockApi(e.api);
      }}
      components={components}
      tabComponents={tabComponents}
    />
  );
};

export default Workspace;
