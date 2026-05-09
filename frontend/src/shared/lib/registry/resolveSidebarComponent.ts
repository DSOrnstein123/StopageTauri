import { featureRegistry } from "./featureRegitry";

export const resolveSidebarComponent = (type: string) => {
  const ContentComponent = featureRegistry.getSidebarComponent(type);
  if (!ContentComponent) return null;
  return ContentComponent;
};
