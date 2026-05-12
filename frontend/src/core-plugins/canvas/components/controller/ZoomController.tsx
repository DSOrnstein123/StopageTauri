import { Button } from "@/shared/components/shadcn/button";
import { Card } from "@/shared/components/shadcn/card";

const ZoomController = () => {
  return (
    <Card className="absolute right-2 bottom-2 z-20 p-1">
      <Button>zoom</Button>
    </Card>
  );
};

export default ZoomController;
