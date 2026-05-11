export const resolveNodeType = (type: string, isTemplate: boolean) => {
  return isTemplate ? `${type}:template` : type;
};
