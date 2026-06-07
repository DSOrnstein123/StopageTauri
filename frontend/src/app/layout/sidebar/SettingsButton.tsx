import Modal from "@system/features/settings/components/Modal";
import { Button } from "@system/ui/shadcn/button";
import { Settings } from "lucide-react";

const SettingsButton = ({ className }: { className: string }) => {
  return (
    <Modal>
      <Button variant="ghost" className={`${className}`}>
        <Settings />
      </Button>
    </Modal>
  );
};

export default SettingsButton;
