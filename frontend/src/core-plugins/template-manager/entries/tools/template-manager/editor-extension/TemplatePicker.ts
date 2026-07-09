import { Plugin, PluginKey } from "@system/lib/tiptap/pm/state";
import { Decoration, DecorationSet } from "@system/lib/tiptap/pm/view";
import { Extension } from "@system/lib/tiptap/react";

export const TemplatePickerKey = new PluginKey("templatePicker");

export const TemplatePicker = Extension.create({
  name: "templatePicker",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: TemplatePickerKey,

        props: {
          decorations(state) {
            const doc = state.doc;

            const isEmpty =
              doc.childCount === 1 &&
              doc.firstChild?.isTextblock &&
              doc.firstChild?.content.size === 0;

            if (!isEmpty) return DecorationSet.empty;

            return DecorationSet.create(doc, [
              Decoration.node(0, doc.firstChild!.nodeSize, {
                class: "template-picker-anchor",
              }),
            ]);
          },
        },
      }),
    ];
  },
});
