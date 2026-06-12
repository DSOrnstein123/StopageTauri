import { systemApi } from "@system/api";
import { useTabContext } from "@system/features/workspace/context/TabContext";
import { Card } from "@system/ui/shadcn/card";

const TemplateItem = ({ id, name }: { id: string; name: string }) => {
  const { id: panelId } = useTabContext();

  return (
    <Card
      onClick={() => {
        systemApi.workspace.navigate(panelId, id);
      }}
    >
      {name}
    </Card>
  );
};

export default TemplateItem;
