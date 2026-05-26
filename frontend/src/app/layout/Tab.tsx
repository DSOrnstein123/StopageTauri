import TabHeader from "@system/tab-system/components/TabHeader";
import TabProvider from "@system/tab-system/context/TabProvider";
import type { TabMode } from "@system/tab-system/types";
import type { IDockviewPanelProps } from "dockview-core";
import { useEffect, useState } from "react";
import DynamicTabContent from "./DynamicContent";
import StaticTabContent from "./StaticTabContent";

interface TabParams {
  id: string;
  mode: TabMode;
  type: string;
}

const Tab = (props: IDockviewPanelProps<TabParams>) => {
  const tabApi = props.api;
  const tabParams = props.params;
  const tabMode = props.params.mode;
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

        {tabMode == "dynamic" ? (
          <DynamicTabContent id={tabParams.id} />
        ) : (
          <StaticTabContent id={tabParams.type} />
        )}
      </TabProvider>
    </div>
  );
};

export default Tab;
