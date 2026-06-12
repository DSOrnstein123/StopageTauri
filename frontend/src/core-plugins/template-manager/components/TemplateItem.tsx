import { systemApi } from "@system/api";
import { useTabContext } from "@system/features/workspace/context/TabContext";
import { Card } from "@system/ui/shadcn/card";
import { NODES } from "../constants";

const TemplateItem = ({ id, name }: { id: string; name: string }) => {
  const { tabId } = useTabContext();

  return (
    <Card
      onClick={() => {
        systemApi.workspace.navigate(tabId, {
          mode: "dynamic",
          type: NODES.DOCUMENT_TEMPLATE,
          nodeId: id,
        });
      }}
    >
      {name}
    </Card>
  );
};

export default TemplateItem;
