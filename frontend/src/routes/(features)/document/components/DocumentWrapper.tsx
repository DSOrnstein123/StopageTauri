import type { IDockviewPanelProps } from "dockview-core";
import Document from "./Document";
import type { DocParams } from "../../../../app/components/page/docParams";
import { PanelProvider } from "../../../../app/components/page/PanelProvider";

const DocumentWrapper = (props: IDockviewPanelProps<DocParams>) => {
  return (
    <PanelProvider props={props}>
      <Document key={props.api.id} />
    </PanelProvider>
  );
};

export default DocumentWrapper;
