import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@system/ui/shadcn/dialog";
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { Separator } from "@system/ui/shadcn/separator";
import Detail from "./Detail";
import { VisuallyHidden } from "radix-ui";

const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="z-100 flex h-150 w-[calc(100%-4rem)] max-w-250! sm:max-w-250!"
        aria-describedby={undefined}
      >
        <VisuallyHidden.Root>
          <DialogTitle />
        </VisuallyHidden.Root>

        <Sidebar className="w-50" />

        <Separator orientation="vertical" />

        <Detail className="w-full" />
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
