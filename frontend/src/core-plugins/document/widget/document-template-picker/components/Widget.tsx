import useCurrentNodeId from "@system/features/workspace/hooks/useCurrentNodeId";
import useApplyTemplateMutation from "../hooks/useApplyTemplateMutation";
import useGetListQuery from "../hooks/useGetListQuery";

const Widget = () => {
  const { data: templates } = useGetListQuery();
  const { mutate: applyTemplate } = useApplyTemplateMutation();
  const nodeId = useCurrentNodeId();

  if (!templates) return null;

  return (
    <div className="bg-gray-400">
      <div>Picker</div>

      {templates.map((template) => (
        <div
          key={template.id}
          onClick={() => {
            applyTemplate({
              templateId: template.id,
              targetId: nodeId,
            });
          }}
        >
          {template.name}
        </div>
      ))}
    </div>
  );
};

export default Widget;
