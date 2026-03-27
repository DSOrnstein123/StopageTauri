import { useWorkspaceStore } from "@/layout/dockview/useWorkspaceStore";
import { TextSelection } from "@tiptap/pm/state";

const DocumentSidebar = () => {
  const editor = useWorkspaceStore((state) => state.activeEditor);
  const items = useWorkspaceStore((state) => state.tocItems);

  if (!items) return;

  const onItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    if (editor) {
      const element = editor.view.dom.querySelector(`[data-toc-id="${id}"]`);

      if (element) {
        const pos = editor.view.posAtDOM(element, 0);
        const tr = editor.view.state.tr;
        tr.setSelection(new TextSelection(tr.doc.resolve(pos)));
        editor.view.dispatch(tr);
        editor.view.focus();

        if (history.pushState) {
          history.pushState(null, "", `#${id}`);
        }

        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

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
              onClick={(e) => onItemClick(e, item.id)}
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
