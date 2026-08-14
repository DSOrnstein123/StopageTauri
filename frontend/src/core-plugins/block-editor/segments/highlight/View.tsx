import useHightlights from "@core-plugins/block-editor/provider/block-editor-provider/features/highlight/useHighlights";
import { systemApi } from "@system/api";
import useActiveTabId from "@system/workbench/workspace/hooks/useActiveTabId";
import { useSyncExternalStore } from "react";

export const View = () => {
  //TODO: resolve is editor api based on entryApi
  const activeTabId = useActiveTabId();
  const activeTabApi = systemApi.workbench.getTabEntryApi<"document">(
    activeTabId!,
  );

  const editor = useSyncExternalStore(
    activeTabApi.subcribeEditor,
    activeTabApi.getEditor,
  );

  const highlights = useHightlights(editor);

  return (
    <div className="flex flex-col gap-1">
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
