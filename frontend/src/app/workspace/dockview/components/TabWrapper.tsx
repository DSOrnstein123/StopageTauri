import Tab from "@system/features/workspace/components/Tab";
import type { IDockviewPanelProps } from "dockview-core";
import type { TabParams } from "../types";
import useWorkspaceStatus from "@system/features/workspace/hooks/useWorkspaceStatus";

const TabWrapper = (props: IDockviewPanelProps<TabParams>) => {
  const workspaceStatus = useWorkspaceStatus();
  if (workspaceStatus !== "ready") return;

  const { api, params } = props;

  return <Tab tabId={api.id} {...params} />;
};

export default TabWrapper;
