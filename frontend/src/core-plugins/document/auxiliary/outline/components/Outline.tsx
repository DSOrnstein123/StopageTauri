import useTOCNavigation from "@core-plugins/block-editor/provider/block-editor-provider/hooks/useTOCNavigation";
import { systemApi } from "@system/api";
import useActiveTabId from "@system/workbench/workspace/hooks/useActiveTabId";

const Outline = () => {
  const activeTabId = useActiveTabId();

  const tabApi = systemApi.workspace.getTabEntryApi<"document">(activeTabId!);
  const editor = tabApi.getEditor();
  const outlineContent = tabApi.getTOC();
  const { navigateToSection } = useTOCNavigation(editor);

  return (
    <div>
      {outlineContent &&
        outlineContent.map((item) => (
          <div
            key={item.id}
            className={`${item.isActive && !item.isScrolledOver ? "is-active" : ""} ${item.isScrolledOver ? "is-scrolled-over" : ""}`}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => navigateToSection(e, item.id)}
              data-item-index={item.itemIndex}
            >
              {item.textContent}
            </a>
          </div>
        ))}
    </div>
  );
};

export default Outline;
