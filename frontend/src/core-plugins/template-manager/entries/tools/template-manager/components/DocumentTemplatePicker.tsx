import useGetTemplatesQuery from "../hooks/useGetTemplatesQuery";

const DocumentTemplatePicker = () => {
  const { data: templates } = useGetTemplatesQuery();

  if (!templates) return null;

  return (
    <div>
      {templates.map((template) => (
        <div key={template.id}>{template.name}</div>
      ))}
    </div>
  );
};

export default DocumentTemplatePicker;
