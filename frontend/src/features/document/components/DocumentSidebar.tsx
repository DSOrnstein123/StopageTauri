import useTOCNavigation from "../hooks/useTOCNavigation";
import { useDocumentStore } from "../store/useDocumentStore";

const DocumentSidebar = () => {
  const editor = useDocumentStore((state) => state.activeEditor);
  const items = useDocumentStore((state) => state.tocItems);
  const { navigateToSection } = useTOCNavigation(editor);

  if (!items || items.length == 0) return null;

  return (
    <div>
      <div>Table of contents</div>
      <div>
        {items.map((item) => (
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
    </div>
  );
};

export default DocumentSidebar;
