import FileList from "./NodeList";
import Toolbar from "./Toolbar";

const NodeExplorer = () => {
  return (
    <div className="relative z-20 h-full space-y-0.5 p-2">
      <Toolbar />
      <FileList />
    </div>
  );
};

export default NodeExplorer;
