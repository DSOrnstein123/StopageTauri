import OpenTemplateManagerButton from "@features/template/components/OpenTemplateManagerButton";
import FileExplorer from "@system/domain/node/components/file-explorer/FileExplorer";

const LeftSidebar = () => {
  return (
    <aside className="bg-primary/5 flex flex-col">
      <FileExplorer />
      <OpenTemplateManagerButton className="justify-end" />
    </aside>
  );
};

export default LeftSidebar;
