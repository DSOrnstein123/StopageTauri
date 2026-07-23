import { DockviewReact, type IDockviewReactProps } from "dockview";
import type { RefAttributes } from "react";

const TabView = (
  props: IDockviewReactProps & RefAttributes<HTMLDivElement>,
) => {
  return <DockviewReact {...props} disableFloatingGroups={true} />;
};

export default TabView;
