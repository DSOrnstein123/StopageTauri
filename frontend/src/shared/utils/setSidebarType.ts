import type { SidebarType } from "@/layout/sidebar/sidebarComponentList";
import useRightSidebarStore from "@/layout/sidebar/rightSidebarStore";

const setSidebarType = (type: SidebarType) => {
  useRightSidebarStore.getState().setType(type);
};

export default setSidebarType;
