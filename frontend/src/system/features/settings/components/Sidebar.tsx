import CorePluginsGroup from "./CorePluginsGroup";

const Sidebar = ({ className }: { className: string }) => {
  return (
    <div className={`${className}`}>
      <CorePluginsGroup />
    </div>
  );
};

export default Sidebar;
