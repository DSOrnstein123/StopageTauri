import { pluginRegistry } from "@system/registries/pluginRegistry";

const StaticTabContent = ({ id }: { id: string }) => {
  /* eslint-disable react-hooks/static-components */
  const Content = pluginRegistry.getComponent(id);
  if (!Content) return null;

  return (
    <div className="pt-0">
      <Content data={{}} />
    </div>
  );
};

export default StaticTabContent;
