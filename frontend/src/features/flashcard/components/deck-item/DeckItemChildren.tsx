import { AnimatePresence, motion } from "motion/react";
import DeckItem from "./DeckItem";
import { cn } from "@shared/lib/tailwind-css/utils";
import type { DeckNode } from "../../types/flashcard.types";

const DeckItemChildren = ({
  data,
  isOpen,
}: {
  data: DeckNode;
  isOpen: boolean;
}) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="mt-1 flex flex-col gap-y-1 pb-4 pl-3">
            {data.children.map((child, index) => (
              <DeckItem
                key={child.id}
                data={child}
                className={cn(
                  "rounded-r-none border-r-0",
                  index == 0 && "rounded-tl-none",
                )}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeckItemChildren;
