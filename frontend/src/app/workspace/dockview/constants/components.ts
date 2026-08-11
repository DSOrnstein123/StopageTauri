import LeftSidebar from "../../../shell/sidebar/LeftSidebar";
import { SegmentWrapper } from "../components/SegmentWrapper";
import TabWrapper from "../components/TabWrapper";
import RightSidebar from "@app/shell/sidebar/RightSidebar";

export const components = {
  fileList: LeftSidebar,
  tab: TabWrapper,
  // sidebarTab: AuxiliaryTabContent,
  segment: SegmentWrapper,
  rightSidebar: RightSidebar,
};
