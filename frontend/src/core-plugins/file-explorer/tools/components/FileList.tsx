import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import FileItem from "./FileItem";
import useGetExplorerFiles from "../hooks/useGetExplorerFiles";

const FileList = () => {
  //TODO: folder
  //TODO: fix getFileList type
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const { data: fileList = [] } = useGetExplorerFiles();

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
          const file = fileList[virtualizerItem.index];

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
              <FileItem data={file} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileList;
