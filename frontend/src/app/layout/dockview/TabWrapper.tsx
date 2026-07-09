import Tab from "@system/features/workspace/components/Tab";
import type { IDockviewPanelProps } from "dockview-core";
import type { DockviewTabParams } from "./dockviewTabParams";

const TabWrapper = (props: IDockviewPanelProps<DockviewTabParams>) => {
  const { api, params } = props;

  return <Tab tabId={api.id} {...params} />;
};

export default TabWrapper;
