import type { PluginId } from "@system/registries/plugin";
import { pluginRegistry } from "@system/registries/pluginRegistry";

const StaticTabContent = ({ type }: { type: PluginId }) => {
  /* eslint-disable react-hooks/static-components */
  const Content = pluginRegistry.getComponent(type);
  if (!Content) return null;

  return (
    <div className="pt-0">
      <Content />
    </div>
  );
};

export default StaticTabContent;
