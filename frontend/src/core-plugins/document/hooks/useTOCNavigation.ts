import { TextSelection } from "@tiptap/pm/state";
import { Editor } from "@tiptap/react";
import { useCallback } from "react";

const useTOCNavigation = (editor: Editor | null) => {
  const navigateToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (!editor) return;
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
    },
    [editor],
  );

  return { navigateToSection };
};

export default useTOCNavigation;
