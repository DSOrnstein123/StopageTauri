import { NODES } from "@core-plugins/template-manager/constants";
import { systemApi } from "@system/api";
import { Card } from "@system/ui/shadcn/card";

const TemplateItem = ({ id, name }: { id: string; name: string }) => {
  return (
    <Card
      onClick={() => {
        systemApi.workspace.openEntry({
          entryCategory: "node",
          nodeId: id,
          nodeType: NODES.DOCUMENT_TEMPLATE,
        });
      }}
    >
      {name}
    </Card>
  );
};

export default TemplateItem;
