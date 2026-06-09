import type { TemplateMetadataList } from "@system/features/node/schemas/templateSchema";
import TemplateItem from "./TemplateItem";

const TemplateGallery = ({
  templateList,
}: {
  templateList: TemplateMetadataList;
}) => {
  return (
    <div className="grid grid-cols-3">
      {templateList.map((template) => (
        <TemplateItem key={template.id} id={template.id} name={template.name} />
      ))}
    </div>
  );
};

export default TemplateGallery;
