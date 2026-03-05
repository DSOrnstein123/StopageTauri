import { type Tab } from "@/app/types/tab.types";
import { cn } from "@/shared/lib/utils";
import { useTabStore } from "@/app/store/tabStore";
import { Button } from "@/shared/components/shadcn/button";
import { useEffect, type MouseEvent } from "react";
import { useNavigate } from "@tanstack/react-router";

const TabHeader = ({ data }: { data: Tab }) => {
  const navigate = useNavigate();

  const isActive = useTabStore((state) => state.activeTabId === data.id);
  const setActiveTab = useTabStore((state) => state.setActiveTab);
  const removeTab = useTabStore((state) => state.removeTab);
  console.log(data.route);

  useEffect(() => {
    if (isActive) {
      navigate({ to: data.route });
    }
    //TODO: fix deps
  }, [isActive, data, navigate]);

  return (
    <div
      className={cn(
        "relative h-full w-32 cursor-default overflow-hidden rounded-t-sm border-x bg-zinc-200 whitespace-nowrap select-none",
        isActive && "bg-white",
      )}
      onClick={() => {
        if (!isActive) {
          setActiveTab(data.id);
          navigate({ to: data.route });
        }
      }}
    >
      {data.title === "" ? "New tab" : data.title}

      {/* TODO: fix X position */}
      <Button
        variant="ghost"
        className="absolute top-1 right-1 size-4 rounded-full bg-white p-0"
        onClick={(e: MouseEvent) => {
          e.stopPropagation();

          removeTab(data.id);
        }}
      >
        x
      </Button>
    </div>
  );
};

export default TabHeader;
