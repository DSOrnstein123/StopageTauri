import { useWorkspaceStore } from "@system/lib/dockview/useWorkspaceStore";

const OpenTemplateManagerButton = ({ className }: { className: string }) => {
  const openTab = useWorkspaceStore((state) => state.openTab);

  return (
    <button
      className={`${className}`}
      onClick={() =>
        openTab({
          name: "Template mangager",
          type: "template",
          mode: "static",
        })
      }
    >
      Template gallery
    </button>
  );
};

export default OpenTemplateManagerButton;
