import { Button } from "@system/ui/shadcn/button";
import Icon from "@system/ui/icon/Icon";
import SettingsButton from "./SettingsButton";
import { systemApi } from "@system/api";

const ActionBar = () => {
  const actionButtons = systemApi.plugin.getActionButtons();

  return (
    <aside className="bg-primary/20 relative flex h-full w-10 flex-col items-center gap-y-px py-1">
      {actionButtons.map((button) => (
        <Button
          key={button.id}
          variant="ghost"
          className="relative size-8"
          onClick={button.action}
        >
          <Icon data={button.icon} />
        </Button>
      ))}

      <SettingsButton className="fixed bottom-1 left-1 size-8" />
    </aside>
  );
};

export default ActionBar;
