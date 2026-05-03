import FileList from "./FileList";
import Toolbar from "./Toolbar";

const FileExplorer = () => {
  return (
    <div className="relative z-20 h-full space-y-0.5 p-2">
      <Toolbar />
      <FileList />
    </div>
  );
};

export default FileExplorer;
