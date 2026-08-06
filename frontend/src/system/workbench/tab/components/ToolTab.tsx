import type { ToolType } from "@system/plugin-manager/plugin";
import { pluginManager } from "@system/plugin-manager/pluginManager";

const ToolTab = ({ toolType }: { toolType: ToolType }) => {
  console.log(toolType);
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
