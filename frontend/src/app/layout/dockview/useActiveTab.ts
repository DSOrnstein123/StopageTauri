import type { DockviewPanelApi } from "dockview-core";
import { useEffect, useState } from "react";

const useActiveTab = (tabApi: DockviewPanelApi) => {
  const [isActive, setIsActive] = useState(tabApi.isActive);

  useEffect(() => {
    const disposable = tabApi.onDidActiveChange((event) => {
      setIsActive(event.isActive);
    });

    return () => disposable.dispose();
  }, [tabApi]);

  return isActive;
};

export default useActiveTab;
