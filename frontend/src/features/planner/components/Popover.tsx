import { Button } from "@/shared/components/shadcn/button";
import {
  FloatingArrow,
  type FloatingContext,
  type UseFloatingReturn,
} from "@floating-ui/react";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface PopoverProps {
  children?: ReactNode;
  ref: UseFloatingReturn["refs"]["setFloating"];
  floatingStyles: React.CSSProperties;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined,
  ) => Record<string, unknown>;
  context: FloatingContext;
  arrowRef: React.RefObject<null>;
  selectedDate: Date | null;
}

const Popover = ({
  ref,
  floatingStyles,
  getFloatingProps,
  context,
  arrowRef,
  selectedDate,
}: PopoverProps) => {
  const focusRef = useRef<HTMLInputElement | null>(null);
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    focusRef.current?.focus();
  }, []);

  if (!selectedDate) return;

  return (
    <div
      ref={ref}
      className="z-100"
      style={floatingStyles}
      {...getFloatingProps()}
    >
      <div className="relative rounded-md border border-black bg-gray-200 p-2">
        <input
          ref={focusRef}
          placeholder="Name your task"
          className="mb-2 w-full"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={() => invoke("create_task", { title: taskName, metadata })}
        >
          Create
        </Button>

        <FloatingArrow
          ref={arrowRef}
          context={context}
          fill="#e5e7eb"
          stroke="black"
          strokeWidth={1}
        />
      </div>
    </div>
  );
};

export default Popover;
