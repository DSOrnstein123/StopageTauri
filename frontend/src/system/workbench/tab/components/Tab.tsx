import TabHeader from "@system/workbench/tab/components/TabHeader";
import TabProvider from "@system/workbench/tab/context/TabProvider";
import { systemApi } from "@system/api";
import type { TabProps } from "../types/tabProps";
import type { TabKind } from "../types/kind";
import { AuxiliaryTab } from "../auxiliary-tab";
import { EntryTab } from "../entry-tab";

const renderTabByKind = (kind: TabKind) => {
  switch (kind) {
    case "auxiliary":
      return <AuxiliaryTab />;
    case "entry":
      return <EntryTab />;
    default:
      return null;
  }
};

const Tab = (props: TabProps) => {
  const { tabId } = props;
  const tab = systemApi.workbench.getTab(tabId);

  if (!tab) return;

  return (
    <div className="flex h-full w-full flex-col">
      <TabProvider value={tab}>
        <TabHeader className="h-10" />

        {renderTabByKind(tab.kind)}
      </TabProvider>
    </div>
  );
};

export default Tab;
