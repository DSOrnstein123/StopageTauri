import FileExplorer from "@system/domain/node/components/file-explorer/FileExplorer";

const LeftSidebar = () => {
  return (
    <aside className="bg-primary/5">
      <FileExplorer />
    </aside>
  );
};

export default LeftSidebar;
