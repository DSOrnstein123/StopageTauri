import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

export const FloatDragExtension = Extension.create({
  name: "floatDrag",

  addProseMirrorPlugins() {
    let dragSource: { pos: number; size: number } | null = null;

    return [
      new Plugin({
        key: new PluginKey("floatDrag"),
        props: {
          handleDOMEvents: {
            dragstart(view, event) {
              const { selection } = view.state;

              if ("node" in selection && selection.node) {
                dragSource = {
                  pos: selection.from,
                  size: (selection.node as any).nodeSize,
                };
                return false;
              }

              const pos = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });
              if (!pos) return false;

              const $pos = view.state.doc.resolve(pos.pos);

              const blockPos =
                $pos.depth > 0 ? $pos.before($pos.depth) : pos.pos;
              const targetNode = view.state.doc.nodeAt(blockPos);

              if (targetNode) {
                dragSource = {
                  pos: blockPos,
                  size: targetNode.nodeSize,
                };
              }

              return false;
            },

            dragover(view, event) {
              const pos = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });
              if (!pos) return false;
              console.log(dragSource);
              const node = view.domAtPos(pos.pos).node;
              const element = (
                node.nodeType === 3 ? node.parentElement : node
              ) as HTMLElement;
              const targetDOM = element?.closest(
                ".ProseMirror > *",
              ) as HTMLElement;

              document
                .querySelectorAll(".drag-hover-left, .drag-hover-right")
                .forEach((el) => {
                  el.classList.remove("drag-hover-left", "drag-hover-right");
                });

              if (!targetDOM) return false;

              const rect = targetDOM.getBoundingClientRect();
              const relativeX = event.clientX - rect.left;
              const leftThreshold = rect.width * 0.2;
              const rightThreshold = rect.width * 0.8;

              if (relativeX < leftThreshold) {
                targetDOM.classList.add("drag-hover-left");
                event.preventDefault();
                return true;
              } else if (relativeX > rightThreshold) {
                targetDOM.classList.add("drag-hover-right");
                event.preventDefault();
                return true;
              }

              return false;
            },

            dragleave() {
              document
                .querySelectorAll(".drag-hover-left, .drag-hover-right")
                .forEach((el) => {
                  el.classList.remove("drag-hover-left", "drag-hover-right");
                });
            },

            drop(view, event) {
              const { state, dispatch } = view;

              const pos = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });
              if (!pos) return false;

              document
                .querySelectorAll(".drag-hover-left, .drag-hover-right")
                .forEach((el) => {
                  el.classList.remove("drag-hover-left", "drag-hover-right");
                });

              const node = view.domAtPos(pos.pos).node;
              const element = (
                node.nodeType === 3 ? node.parentElement : node
              ) as HTMLElement;
              const targetDOM = element?.closest(
                ".ProseMirror > *",
              ) as HTMLElement;

              if (!targetDOM) return false;

              const rect = targetDOM.getBoundingClientRect();
              const relativeX = event.clientX - rect.left;
              const leftThreshold = rect.width * 0.2;
              const rightThreshold = rect.width * 0.8;

              let align = null;
              if (relativeX < leftThreshold) align = "left";
              else if (relativeX > rightThreshold) align = "right";

              if (!align) return false;
              event.preventDefault();

              const draggedNodeSlice = view.dragging?.slice;
              if (!draggedNodeSlice) return false;

              // Lấy vị trí ngay trước thẻ <p>
              const $pos = state.doc.resolve(pos.pos);
              const targetPos =
                $pos.depth > 0 ? $pos.before($pos.depth) : pos.pos;

              const tr = state.tr;

              // FIX: Xóa Node cũ dựa trên tọa độ đã lưu từ dragstart
              // Thay vì dùng tr.deleteSelection()
              if (dragSource) {
                tr.delete(dragSource.pos, dragSource.pos + dragSource.size);
              } else {
                // Fallback nếu không bắt được dragstart (ít khi xảy ra)
                tr.deleteSelection();
              }

              // Tính toán lại vị trí chèn sau khi xóa
              const mappedTargetPos = tr.mapping.map(targetPos);

              const contentNode = draggedNodeSlice.content.firstChild;
              if (contentNode) {
                const newAttrs = { ...contentNode.attrs };
                if (contentNode.type.spec.attrs?.align) {
                  newAttrs.align = align;
                }

                const newNode = contentNode.type.create(
                  newAttrs,
                  contentNode.content,
                );

                tr.insert(mappedTargetPos, newNode);
              }

              dispatch(tr);

              dragSource = null;

              return true;
            },

            dragend() {
              dragSource = null;
            },
          },
        },
      }),
    ];
  },
});
