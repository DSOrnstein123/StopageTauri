import { useCommand } from "@embedpdf/plugin-commands/react";

const CommandButton = ({
  commandId,
  documentId,
}: {
  commandId: string;
  documentId: string;
}) => {
  const command = useCommand(commandId, documentId);
  if (!command) return null;
  return (
    <button
      onClick={command.execute}
      disabled={command.disabled}
      className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-gray-300 transition-all hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-gray-700 dark:text-gray-300 dark:ring-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-100"
      title={
        command.shortcuts
          ? `Shortcut: ${command.shortcuts.join(", ")}`
          : undefined
      }
    >
      OK
    </button>
  );
};

export default CommandButton;
