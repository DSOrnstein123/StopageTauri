import { TabView } from "@system/lib/dockview";
import { SegmentContent } from "@system/workbench/segment/public";
import type { Tab } from "@system/workbench/tab/tab";

const Content = ({ activeTab }: { activeTab: Tab }) => {
  const activeTabStore = activeTab.store;

  return (
    <div className="flex">
      <TabView
        components={{ segment: SegmentContent }}
        onReady={(event) => {
          event.api.addPanel({
            id: "segment",
            component: "segment",
          });
        }}
      />
    </div>
  );
};

export default Content;
