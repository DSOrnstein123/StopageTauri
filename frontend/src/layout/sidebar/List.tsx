import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import File from "./items/File";
import useGetFileList from "@/entities/file/hooks/useGetFileList";

const List = () => {
  //TODO: folder
  //TODO: fix getfileList type
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const { data: fileList = [] } = useGetFileList();

  const virtualizer = useVirtualizer({
    count: fileList.length,
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
          const document = fileList[virtualizerItem.index];

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
              <File id={document.id} name={document.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
