import { Fragment, useCallback, useRef, useState } from "react";
import getCalendarDatesForMonth from "../utils/getCalendarDatesForMonth";
import {
  useFloating,
  useClick,
  useInteractions,
  flip,
  offset,
  arrow,
  autoUpdate,
} from "@floating-ui/react";
import DateCell from "./DateCell";
import Popover from "./Popover";
import { getMonth, getYear } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Task from "./Task";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Task {
  title: string;
  metadata: {
    startDate: string;
    endDate: string;
    color?: string;
  };
}

const mockTasks: Task[] = [
  {
    title: "123",
    metadata: {
      startDate: "2026-03-25",
      endDate: "2026-03-27",
    },
  },
  {
    title: "456",
    metadata: {
      startDate: "2026-03-28",
      endDate: "2026-04-03",
    },
  },
];

const Calendar = () => {
  const now = new Date();
  const [month, setMonth] = useState(getMonth(now) + 1);
  const [year, setYear] = useState(getYear(now));
  const currentYear = getYear(now);
  const dates = getCalendarDatesForMonth(month, currentYear);

  const arrowRef = useRef(null);
  const [popoverOpenIndex, setPopoverOpenIndex] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "top",
    open: open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      flip(),
      offset(),
      arrow({
        element: arrowRef,
      }),
    ],
  });

  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  const handleOnClick = useCallback(
    (e: React.MouseEvent<Element, MouseEvent>, id: string) => {
      refs.setReference(e.currentTarget);
      setPopoverOpenIndex(id);
      setOpen(true);
    },
    [refs],
  );

  return (
    <div className="h-[calc(100vh-80px)] w-full overflow-y-auto">
      <div className="sticky top-0 left-0 z-10 flex flex-col bg-white">
        <div className="flex h-6">
          <ArrowLeft onClick={() => setMonth((prev) => prev - 1)} />
          {month}
          <ArrowRight onClick={() => setMonth((prev) => prev + 1)} />
        </div>
        <div className="grid h-6 grid-cols-7">
          {days.map((day) => (
            <div className="border-t border-r border-b pl-1 text-sm leading-6 font-medium">
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7">
        {dates.map((date) => (
          <div key={date.id} className="relative">
            <DateCell
              id={date.id}
              date={date.date}
              handleOnClick={handleOnClick}
              getReferenceProps={
                date.id === popoverOpenIndex ? getReferenceProps : undefined
              }
            />

            {mockTasks.find((task) => task.metadata.startDate == date.id) && (
              <Task id="1" title={"ok"} />
            )}
          </div>
        ))}
      </div>

      {open && (
        <Popover
          ref={refs.setFloating}
          arrowRef={arrowRef}
          floatingStyles={floatingStyles}
          getFloatingProps={getFloatingProps}
          context={context}
        />
      )}
    </div>
  );
};

export default Calendar;
