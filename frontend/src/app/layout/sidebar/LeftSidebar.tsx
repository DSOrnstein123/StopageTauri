import FileExplorer from "@core-plugins/file-explorer/components/FileExplorer";
import OpenTemplateManagerButton from "@core-plugins/template/components/OpenTemplateManagerButton";

const LeftSidebar = () => {
  return (
    <aside className="bg-primary/5 flex flex-col">
      <FileExplorer />
      <OpenTemplateManagerButton className="justify-end" />
    </aside>
  );
};

export default LeftSidebar;
