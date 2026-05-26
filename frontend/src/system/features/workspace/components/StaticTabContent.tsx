import { pluginRegistry } from "@system/registries/pluginRegistry";

const StaticTabContent = ({ type }: { type: string }) => {
  /* eslint-disable react-hooks/static-components */
  const Content = pluginRegistry.getComponent(type);
  if (!Content) return null;

  return (
    <div className="pt-0">
      <Content data={{}} />
    </div>
  );
};

export default StaticTabContent;
