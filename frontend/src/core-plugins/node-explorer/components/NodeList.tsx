import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import FileItem from "./NodeItem";
import useGetExplorerNodes from "../hooks/useGetExplorerNodes";

const NodeList = () => {
  //TODO: folder
  //TODO: fix getNodeList type
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const { data: nodeList = [] } = useGetExplorerNodes();

  const virtualizer = useVirtualizer({
    count: nodeList.length,
    estimateSize: () => 32,
    getScrollElement: () => scrollElementRef.current,
    overscan: 5,
  });

  const virtualizerItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={scrollElementRef}
      className="h-[calc(100dvh-16px)] overflow-y-auto"
    >
      <div
        className="relative"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualizerItems.map((virtualizerItem) => {
          const node = nodeList[virtualizerItem.index];

          return (
            <div
              key={virtualizerItem.key}
              className="absolute top-0 left-0 w-full"
              style={{
                transform: `translateY(${virtualizerItem.start}px)`,
                height: `${virtualizerItem.size}px`,
              }}
              data-index={virtualizerItem.index}
            >
              <FileItem id={node.id} name={node.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NodeList;
