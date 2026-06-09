import { systemApi } from "@system/apis";

const TemplateList = () => {
  const useGetTemplatesQuery = systemApi.plugin.getApi("core.template-manager")
    .hooks.useGetList;
  const { data: templates } = useGetTemplatesQuery();

  if (!templates) return null;

  return (
    <div>
      {templates.map((template) => (
        <div>{template.name}</div>
      ))}
    </div>
  );
};

export default TemplateList;
