import useGetTemplatesQuery from "../hooks/useGetTemplatesQuery";
import CreateModal from "./CreateModal";
import TemplateGallery from "./TemplateGallery";

const TemplateManager = () => {
  const { data: templates } = useGetTemplatesQuery();

  if (!templates) return null;

  return (
    <div className="flex flex-col">
      <CreateModal />

      <TemplateGallery templateList={templates}></TemplateGallery>
    </div>
  );
};

export default TemplateManager;
