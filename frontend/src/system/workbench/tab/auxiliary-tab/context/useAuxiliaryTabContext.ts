import { useTabContext } from "../../context/TabContext";

export const useAuxiliaryTabContext = () => {
  const tab = useTabContext();

  if (tab.kind !== "auxiliary") {
    throw new Error("Current tab is not an AuxiliaryTab");
  }

  return tab;
};
