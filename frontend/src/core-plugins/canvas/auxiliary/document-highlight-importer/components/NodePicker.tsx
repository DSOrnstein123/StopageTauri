import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@system/shared/ui/shadcn/dialog";
import type { ReactNode } from "react";
import { NodeList } from "./NodeList";

//TODO: move business logic out of picker (handle through onSelect)
export const NodePicker = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>Choose a node</DialogHeader>

        <NodeList />
      </DialogContent>
    </Dialog>
  );
};
