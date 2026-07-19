import TabHeader from "@system/features/workspace/components/TabHeader";
import TabProvider from "@system/features/workspace/context/TabProvider";
import type { TabProps } from "../types/tabProps";
import { systemApi } from "@system/api";
import TabContent from "./TabContent";

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
