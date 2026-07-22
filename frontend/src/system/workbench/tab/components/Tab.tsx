import TabHeader from "@system/workbench/tab/components/TabHeader";
import TabProvider from "@system/workbench/tab/context/TabProvider";
import { systemApi } from "@system/api";
import TabContent from "./TabContent";
import type { TabProps } from "../types/tabProps";

const Tab = (props: TabProps) => {
  const { tabId } = props;
  const tab = systemApi.workspace.getTab(tabId);

  if (!tab) return;

  return (
    <div className="flex h-full flex-col">
      <TabProvider value={tab}>
        <TabHeader className="h-10" />

        <TabContent tabProps={props} className="h-full" />
      </TabProvider>
    </div>
  );
};

export default Tab;
