import Tab from "@system/features/workspace/components/Tab";
import type { TabParams } from "@system/features/workspace/types/tabParams";
import useActiveTab from "@system/lib/dockview/adapter/useActiveTab";
import type { IDockviewPanelProps } from "dockview-core";

const TabWrapper = (props: IDockviewPanelProps<TabParams>) => {
  const { api, params } = props;
  const isActive = useActiveTab(api);

  return (
    <Tab
      {...params}
      isActive={isActive}
      setTitle={(newTitle) => api.setTitle(newTitle)}
    />
  );
};

export default TabWrapper;
