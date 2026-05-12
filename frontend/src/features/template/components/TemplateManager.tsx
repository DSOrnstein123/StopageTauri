import useGetTemplates from "../hooks/useGetTemplates";
import TemplateGallery from "./TemplateGallery";

const TemplateManager = () => {
  const { data: templates } = useGetTemplates();

  if (!templates) return null;

  return <TemplateGallery templateList={templates}></TemplateGallery>;
};

export default TemplateManager;
