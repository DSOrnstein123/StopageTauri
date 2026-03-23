import { Button } from "@/shared/components/shadcn/button";
import TabHeader from "./TabHeader";
import { AppBreadCrumb } from "@/app/components/AppBreadCrumb";
import { Separator } from "@/shared/components/shadcn/separator";
import { Plus } from "lucide-react";

import { useTabStore } from "@/app/store/tabStore";

const TabBar = () => {
  const tabs = useTabStore((state) => state.tabs);
  const addTab = useTabStore((state) => state.addTab);

  return (
    //TODO: relearn fixed and sticky
    <div className="sticky top-0 left-0 z-10 h-20.25 w-full">
      <div className="flex h-10 bg-zinc-300 pt-1">
        {tabs.map((tab) => (
          <TabHeader data={tab} key={tab.id} />
        ))}

        <Button variant="ghost" onClick={() => addTab("/")}>
          <Plus />
        </Button>
      </div>

      <div className="flex h-10 items-center bg-white pl-2">
        <AppBreadCrumb />
      </div>

      <Separator />
    </div>
  );
};

export default TabBar;
