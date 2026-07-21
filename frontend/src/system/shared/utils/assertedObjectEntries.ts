export const assertedObjectEntries = <O extends object>(object: O) => {
  return Object.entries(object) as [keyof O, O[keyof O]][];
};
