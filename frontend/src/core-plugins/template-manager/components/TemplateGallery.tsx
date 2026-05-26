import { Card } from "@system/components/shadcn/card";
import type { TemplateMetadataList } from "@system/domain/node/schemas/templateSchema";

const TemplateGallery = ({
  templateList,
}: {
  templateList: TemplateMetadataList;
}) => {
  return (
    <div className="grid grid-cols-3">
      {templateList.map((template) => (
        <Card key={template.id}>{template.name}</Card>
      ))}
    </div>
  );
};

export default TemplateGallery;
