import { featureRegistry } from "./featureRegitry";

export const resolveComponent = (type: string) => {
  const ContentComponent = featureRegistry.getComponent(type);
  if (!ContentComponent) return null;
  return ContentComponent;
};
