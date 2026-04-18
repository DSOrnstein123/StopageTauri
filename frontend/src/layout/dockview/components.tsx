import LeftSidebar from "../sidebar/LeftSidebar";
import { dockviewAdapterComponents } from "./Adapter";

export const components = {
  ...dockviewAdapterComponents,
  fileList: LeftSidebar,
};
