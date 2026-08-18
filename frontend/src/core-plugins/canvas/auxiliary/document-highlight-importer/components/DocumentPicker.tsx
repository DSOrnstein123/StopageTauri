import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@system/shared/ui/shadcn/dialog";
import type { ReactNode } from "react";
import { DocumentList } from "./DocumentList";

export const DocumentPicker = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>Choose a document</DialogHeader>

        <DocumentList />
      </DialogContent>
    </Dialog>
  );
};
