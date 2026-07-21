import useTab from "./useTab";

const useCurrentEntry = () => {
  const tab = useTab();
  return tab.currentEntry;
};

export default useCurrentEntry;
