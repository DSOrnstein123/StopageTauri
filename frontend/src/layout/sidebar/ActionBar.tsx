import { Button } from "@/shared/components/shadcn/button";
import { Calendar } from "lucide-react";
import useCreateDocument from "@/routes/(features)/document/hooks/useCreateDocument";
import { useWorkspaceStore } from "../dockview/useWorkspaceStore";
import type { DocumentParams } from "@/routes/(features)/document/document.params";

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
          openFile<DocumentParams>("document", data.title, {
            documentId: data.id,
          });
          // addTab(`/documents/${data.id}`);
          // navigate({
          //   to: `/documents/$documentId`,
          //   params: { documentId: data.id },
          // });
        }}
      >
        <img src="/icon/new_note.svg" className="h-5 w-5" />
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
      <Button variant="ghost" className="relative size-8">
        <Calendar />
      </Button>

      {/* spine */}
      <Button variant="ghost" className="relative size-8">
        =`{">"}`
      </Button>

      {/* pdf */}
      <button
        className="rounded-md border"
        onClick={() => {
          // navigate({ to: "/pdf-reader" });
        }}
      >
        pdf
      </button>
    </aside>
  );
};

export default ActionBar;
