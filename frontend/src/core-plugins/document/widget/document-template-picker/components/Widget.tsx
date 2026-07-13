import { useUpdateCurrentDocumentContent } from "@core-plugins/document";
import useGetListQuery from "../hooks/useGetListQuery";

const Widget = () => {
  const { data: templates } = useGetListQuery();
  const updateContent = useUpdateCurrentDocumentContent();

  if (!templates) return null;

  return (
    <div className="bg-gray-400">
      <div>Picker</div>

      {templates.map((template) => (
        <div key={template.id} onClick={() => updateContent(template)}>
          {template.name}
        </div>
      ))}
    </div>
  );
};

export default Widget;
