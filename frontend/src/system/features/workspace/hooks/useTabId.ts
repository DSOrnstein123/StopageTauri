import useTab from "./useTab";

const useTabId = () => {
  const tab = useTab();
  return tab.id;
};

export default useTabId;
