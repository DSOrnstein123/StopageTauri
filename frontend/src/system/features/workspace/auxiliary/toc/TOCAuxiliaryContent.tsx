import useTOCContent from "@system/features/text-editor/hooks/useTOCContent";
import useTOCNavigation from "@system/features/text-editor/hooks/useTOCNavigation";
import type { EditorStore } from "@system/features/text-editor/stores/createEditorStore";
import { Editor } from "@system/lib/tiptap";
import type { StoreApi } from "zustand";

const TOCAuxiliaryContent = ({
  editor,
  store,
}: {
  editor: Editor;
  store: StoreApi<EditorStore>;
}) => {
  const { navigateToSection } = useTOCNavigation(editor);
  const tocContent = useTOCContent(store);

  return (
    <div>
      {tocContent &&
        tocContent.map((item) => (
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

export default TOCAuxiliaryContent;
