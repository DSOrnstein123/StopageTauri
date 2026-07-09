import TemplateItem from "./TemplateItem";
import useGetTemplatesQuery from "../hooks/useGetTemplatesQuery";

const TemplateGallery = () => {
  const { data: templates } = useGetTemplatesQuery();
  if (!templates) return null;

  return (
    <div className="grid grid-cols-3">
      {templates.map((template) => (
        <TemplateItem key={template.id} id={template.id} name={template.name} />
      ))}
    </div>
  );
};

export default TemplateGallery;
