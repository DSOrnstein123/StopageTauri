import { systemApi } from "@system/api";
import { Card } from "@system/shared/ui/shadcn/card";

const TemplateItem = ({ id, name }: { id: string; name: string }) => {
  return (
    <Card
      onClick={() => {
        systemApi.workbench.openEntry({
          entryCategory: "node",
          nodeId: id,
          nodeType: "document-template",
        });
      }}
    >
      {name}
    </Card>
  );
};

export default TemplateItem;
