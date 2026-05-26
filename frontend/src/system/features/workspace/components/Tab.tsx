import TabHeader from "@system/features/workspace/components/TabHeader";
import TabProvider from "@system/features/workspace/context/TabProvider";
import type { TabMode } from "@system/features/workspace/types";
import type { IDockviewPanelProps } from "dockview-core";
import { useEffect, useState } from "react";
import DynamicTabContent from "./DynamicTabContent";
import StaticTabContent from "./StaticTabContent";

interface TabParams {
  id: string;
  mode: TabMode;
  type: string;
}

const Tab = (props: IDockviewPanelProps<TabParams>) => {
  const tabApi = props.api;
  const tabParams = props.params;
  const [isActive, setIsActive] = useState(tabApi.isActive);

  useEffect(() => {
    const disposable = tabApi.onDidActiveChange((event) => {
      setIsActive(event.isActive);
    });

    return () => disposable.dispose();
  }, [tabApi]);

  const value = {
    id: tabApi.id,
    isActive: isActive,
    setTitle: (title: string) => tabApi.setTitle(title),
  };

  return (
    <div className="flex h-full flex-col">
      <TabProvider props={value}>
        <TabHeader className="h-10" />

        {tabParams.mode == "dynamic" ? (
          <DynamicTabContent id={tabParams.id} />
        ) : (
          <StaticTabContent type={tabParams.type} />
        )}
      </TabProvider>
    </div>
  );
};

export default Tab;
