import { systemApi } from "@system/apis";

const TemplateList = () => {
  const useGetTemplates = systemApi.plugin.getApi("core.template-manager").hooks
    .useGetList;
  const { data: templates } = useGetTemplates();

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
