import CreateModal from "./CreateModal";
import TemplateGallery from "./TemplateGallery";

const TemplateManager = () => {
  return (
    <div className="flex flex-col">
      <CreateModal />

      <TemplateGallery></TemplateGallery>
    </div>
  );
};

export default TemplateManager;
