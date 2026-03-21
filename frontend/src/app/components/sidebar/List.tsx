import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import File from "./items/File";
import { useGetDocumentList } from "@/routes/(features)/documents/-hooks/useGetDocumentList";

const List = () => {
  //TODO: folder
  //TODO: fix getDocumentsList type
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const { data: documentsList = [] } = useGetDocumentList();

  const virtualizer = useVirtualizer({
    count: documentsList.length,
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
          const document = documentsList[virtualizerItem.index];

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
              <File id={document.id} title={document.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
