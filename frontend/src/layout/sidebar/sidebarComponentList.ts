import DocumentSidebar from "@/features/document/DocumentSidebar";
import FlashCardsSidebar from "@/features/flashcard/components/FlashCardsSidebar";
import PdfSidebar from "@/features/pdf-reader/components/PdfSidebar";
import SpinePlayerSidebar from "@/plugins/spine-player/SpinePlayerSidebar";
import type { JSX } from "react";

const sidebarComponentList = {
  flashcards: FlashCardsSidebar,
  pdf: PdfSidebar,
  spinePlayer: SpinePlayerSidebar,
  document: DocumentSidebar,
  none: () => null,
} satisfies Record<string, () => JSX.Element | null | undefined>;

type SidebarType = keyof typeof sidebarComponentList;

export { sidebarComponentList, type SidebarType };
