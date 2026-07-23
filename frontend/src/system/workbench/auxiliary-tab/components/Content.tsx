import { TabView } from "@system/lib/dockview";
import { SegmentContent } from "@system/workbench/segment/public";

const Content = () => {
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
