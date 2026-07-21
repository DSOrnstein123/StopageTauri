import { systemApi } from "@system/api";

const CorePluginsGroup = () => {
  const plugins = systemApi.plugin.getPluginConfigs();

  return (
    <div className="flex flex-col">
      <div>Core plugins</div>

      <div className="">
        {Array.from(plugins.entries()).map(([pluginId, pluginConfig]) => (
          <div key={pluginId}>{pluginConfig.name}</div>
        ))}
      </div>
    </div>
  );
};

export default CorePluginsGroup;
