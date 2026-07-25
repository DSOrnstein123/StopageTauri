import { useEditor, type UseEditorOptions } from "@system/lib/tiptap";
import { richTextEditorExtensions } from "../extensions";
import { useMemo } from "react";
import { TableOfContents, type TableOfContentData } from "@system/lib/tiptap";

interface EditorOptions extends Partial<UseEditorOptions> {
  onTOCUpdate?: (data: TableOfContentData, isCreate?: boolean) => void;
}

export const useCreateRichTextEditor = (options?: EditorOptions) => {
  const customAttributes = options?.editorProps?.attributes as
    Record<string, string> | undefined;
  const customClass = customAttributes?.class;

  const configuredExtensions = useMemo(
    () => [
      TableOfContents.configure({
        onUpdate: options?.onTOCUpdate,
      }),
    ],
    [options?.onTOCUpdate],
  );

  return useEditor({
    immediatelyRender: false,
    ...options,

    extensions: [
      ...richTextEditorExtensions,
      ...configuredExtensions,
      ...(options?.extensions || []),
    ],

    editorProps: {
      ...options?.editorProps,

      attributes: {
        class: `focus:outline-none prose-mirror-container ${customClass}`,
        ...options?.editorProps?.attributes,
      },
      // handleClick(_view, _pos, event) {
      //   const target = event.target as HTMLElement;
      //   const anchor = target.closest("a");

      //   if (!anchor) return false;

      //   const href = anchor.getAttribute("href");

      //   if (href?.startsWith("/documents/")) {
      //     // TODO: change to scalable link
      //     const nodeId = href.split("/documents/")[1];
      //     systemApi.workspace.navigate(tabId, nodeId);
      //     return true;
      //   }

      //   if (href) {
      //     window.open(href, "_blank");
      //     return true;
      //   }

      //   return false;
      // },
    },
  });
};
