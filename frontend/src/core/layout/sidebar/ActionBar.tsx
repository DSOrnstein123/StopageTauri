import { Button } from "@shared/components/shadcn/button";
import { Calendar, FilePlus } from "lucide-react";
import useCreateDocument from "@features/document/hooks/useCreateDocument";
import { useWorkspaceStore } from "@shared/lib/dockview/useWorkspaceStore";

const ActionBar = () => {
  const { mutateAsync: createDocument } = useCreateDocument();
  const openFile = useWorkspaceStore((state) => state.openFile);

  return (
    <aside className="bg-primary/20 flex h-full w-10 flex-col items-center gap-y-px py-1">
      {/* document */}
      <Button
        variant="ghost"
        className="relative size-8 p-0"
        onClick={async () => {
          const data = await createDocument();
          openFile(data.id, data.name);
        }}
      >
        <FilePlus />
      </Button>

      {/* flashcard */}
      <Button
        variant="ghost"
        className="relative size-8"
        // onClick={() => addTab("/flashcards", "Flashcards")}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="50"
            y="10"
            width="50"
            height="70"
            rx="6"
            ry="6"
            transform="rotate(15 30 10)"
            stroke="black"
            strokeWidth="5"
            fill="white"
          />

          <rect
            x="10"
            y="20"
            width="50"
            height="70"
            rx="6"
            ry="6"
            transform="rotate(-10 10 20)"
            stroke="black"
            strokeWidth="5"
            fill="white"
          />
        </svg>
      </Button>

      {/* calendar */}
      <Button
        variant="ghost"
        className="relative size-8"
        onClick={() => openFile("planner", "Planner")}
      >
        <Calendar />
      </Button>

      {/* spine */}
      <Button variant="ghost" className="relative size-8">
        Sp
      </Button>

      {/* pdf */}
      <button className="rounded-md border" onClick={() => {}}>
        pdf
      </button>

      <button onClick={() => openFile("canvas", "canvas")}>Canvas</button>
    </aside>
  );
};

export default ActionBar;
