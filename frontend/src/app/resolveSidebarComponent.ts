import { featureRegistry } from "./init";

export const resolveSidebarComponent = (type: string) => {
  const ContentComponent = featureRegistry.getSidebarComponent(type);
  if (!ContentComponent) return null;
  return ContentComponent;
};
