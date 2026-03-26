import DocumentSidebar from "@/routes/(features)/document/DocumentSidebar";
import FlashCardsSidebar from "@/routes/(features)/flashcard/components/FlashCardsSidebar";
import PdfSidebar from "@/routes/(features)/pdf-reader/-components/PdfSidebar";
import SpinePlayerSidebar from "@/routes/(plugins)/spine-player/SpinePlayerSidebar";
import type { JSX } from "react";

const sidebarComponentList = {
  flashcards: FlashCardsSidebar,
  pdf: PdfSidebar,
  spinePlayer: SpinePlayerSidebar,
  document: DocumentSidebar,
  none: () => null,
} satisfies Record<string, () => JSX.Element | null>;

type SidebarType = keyof typeof sidebarComponentList;

export { sidebarComponentList, type SidebarType };
