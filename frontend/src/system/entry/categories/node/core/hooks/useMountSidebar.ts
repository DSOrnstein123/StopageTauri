import type { PluginId } from "@system/plugin-manager/plugin";
import { useRightSidebarStore } from "@system/stores/useSidebarStore";
import { useEffect } from "react";

const useMountSidebar = (type: PluginId) => {
  const setType = useRightSidebarStore((state) => state.setType);

  useEffect(() => {
    setType(type);

    return () => setType(null);
  }, [setType, type]);
};

export default useMountSidebar;
