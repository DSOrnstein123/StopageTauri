import List from "./List";
import Toolbar from "./Toolbar";

const LeftSidebar = () => {
  return (
    <aside className="bg-primary/5 relative z-20 h-full space-y-0.5 p-2">
      <Toolbar />
      <List />
    </aside>
  );
};

export default LeftSidebar;
