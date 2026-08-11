import { tabComponents } from "@app/workspace/dockview/constants/tabComponents";
import { TabView } from "@system/lib/dockview";
import { themeLight } from "dockview-core";
import { useAuxiliaryTabContext } from "../context/useAuxiliaryTabContext";
import { components } from "@app/workspace/dockview/constants/components";

const Content = () => {
  const context = useAuxiliaryTabContext();
  const segments = context.segments;

  return (
    <div className="h-full w-full">
      <TabView
        theme={themeLight}
        onReady={(event) => {
          Array.from(segments).forEach(([segmentId, segmentConfig]) =>
            event.api.addPanel({
              id: segmentId,
              title: segmentConfig.name,
              component: "segment",
              tabComponent: "verticalHeader",
            }),
          );
        }}
        components={components}
        tabComponents={tabComponents}
        defaultHeaderPosition="left"
      />
    </div>
  );
};

export default Content;
