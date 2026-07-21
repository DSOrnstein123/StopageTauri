import Modal from "@system/settings/components/Modal";
import { Button } from "@system/shared/ui/shadcn/button";
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
