import useGetTemplates from "../hooks/useGetTemplates";
import CreateModal from "./CreateModal";
import TemplateGallery from "./TemplateGallery";

const TemplateManager = () => {
  const { data: templates } = useGetTemplates();

  if (!templates) return null;

  return (
    <div className="flex flex-col">
      <CreateModal></CreateModal>

      <TemplateGallery templateList={templates}></TemplateGallery>
    </div>
  );
};

export default TemplateManager;
