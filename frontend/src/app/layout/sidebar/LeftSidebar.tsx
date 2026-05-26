import FileExplorer from "@core-plugins/file-explorer/components/FileExplorer";

const LeftSidebar = () => {
  return (
    <aside className="bg-primary/5 flex flex-col">
      <FileExplorer />
    </aside>
  );
};

export default LeftSidebar;
