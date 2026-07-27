import useHightlights from "@core-plugins/block-editor/provider/block-editor-provider/extensions/semantic-highlight/useHighlights";
import { systemApi } from "@system/api";
import useActiveTabId from "@system/workbench/workspace/hooks/useActiveTabId";

const View = () => {
  const activeTabId = useActiveTabId();
  const activeTabApi = systemApi.workspace.getTabEntryApi<"document">(
    activeTabId!,
  );
  const activeTab = systemApi.workspace.getTab(activeTabId!);
  const editor = activeTabApi.getEditor();
  const activeEntryStore = activeTab!.entryStore;
  const highlights = useHightlights(activeEntryStore!, editor);

  return (
    <div className="flex flex-col gap-1">
      Highlight
      {highlights.map((highlight) => (
        <button
          key={highlight.id}
          type="button"
          className="hover:bg-accent rounded-md px-2 py-1.5 text-left"
        >
          {highlight.text}
        </button>
      ))}
    </div>
  );
};

export default View;
