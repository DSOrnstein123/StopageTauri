import { pluginRegistry } from "@system/registries/pluginRegistry";

const TemplatePicker = () => {
  const useGetTemplates = pluginRegistry.getApi("core.template-manager")?.hooks
    ?.useGetList;
  const { data: templates } = useGetTemplates();

  return (
    <div>
      {templates.map((template) => (
        <div>{template.name}</div>
      ))}
    </div>
  );
};

export default TemplatePicker;
