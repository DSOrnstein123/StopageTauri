import type { IDockviewPanelProps } from "dockview-core";
import Document from "./components/Document";
import { PanelProvider } from "@/layout/dockview/panel-context/PanelProvider";
import type { DocumentParams } from "./document.params";

const DocumentPanel = (props: IDockviewPanelProps<DocumentParams>) => {
  return (
    <PanelProvider props={props}>
      <Document key={props.api.id} />
    </PanelProvider>
  );
};

export default DocumentPanel;
