import type { ToolType } from "@system/registries/plugin";
import { pluginManager } from "@system/registries/pluginManager";

const ToolTab = ({ toolType }: { toolType: ToolType }) => {
  /* eslint-disable react-hooks/static-components */
  const Content = pluginManager.getToolView(toolType);
  if (!Content) return null;

  return (
    <div className="pt-0">
      <Content />
    </div>
  );
};

export default ToolTab;
