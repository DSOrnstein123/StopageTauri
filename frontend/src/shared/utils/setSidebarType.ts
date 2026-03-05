import type { SidebarType } from "@/app/components/sidebar/sidebarComponentList";
import useRightSidebarStore from "@/app/store/rightSidebarStore";

const setSidebarType = (type: SidebarType) => {
  useRightSidebarStore.getState().setType(type);
};

export default setSidebarType;
