import type { IDockviewPanelProps } from "dockview-core";
import Document from "./Document";
import type { DocParams } from "./docParams";
import { PanelProvider } from "./PanelProvider";

const DocumentWrapper = (props: IDockviewPanelProps<DocParams>) => {
  return (
    <PanelProvider props={props}>
      <Document key={props.api.id} />
    </PanelProvider>
  );
};

export default DocumentWrapper;
