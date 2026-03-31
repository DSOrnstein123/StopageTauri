import { useCallback, useRef, useState } from "react";
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
import { differenceInDays, getDate, getDay, parseISO } from "date-fns";
import Task from "./Task";
import { useCalendar } from "../hooks/useCalendar";
import CalendarHeader from "./CalendarHeader";

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
  {
    title: "456",
    metadata: {
      startDate: "2026-03-01",
      endDate: "2026-03-23",
    },
  },
];

const Calendar = () => {
  const { month, year, nextMonth, prevMonth } = useCalendar();
  const { firstDayOfCurrentMonth, dates } = getCalendarDatesForMonth(
    month,
    year,
  );

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
      // eslint-disable-next-line react-hooks/refs
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
      <CalendarHeader
        month={month}
        year={year}
        onNext={nextMonth}
        onPrev={prevMonth}
      />

      <div className="relative grid grid-cols-7">
        {dates.map((date) => (
          <DateCell
            key={date.id}
            id={date.id}
            date={date.date}
            handleOnClick={handleOnClick}
            getReferenceProps={
              date.id === popoverOpenIndex ? getReferenceProps : undefined
            }
          />
        ))}

        {mockTasks.map((task) => {
          const startDay = getDay(task.metadata.startDate) + 1;
          const daysInFirstWeek = 7 - startDay + 1;

          const startDate = parseISO(task.metadata.startDate);
          const endDate = parseISO(task.metadata.endDate);
          const duration = differenceInDays(endDate, startDate) + 1;

          const row = Math.ceil(
            (getDate(startDate) + firstDayOfCurrentMonth) / 7,
          );
          const segments = Math.ceil((duration + (startDay - 1)) / 7);

          return Array.from({ length: segments }).map((_, i) => {
            let currentSpan;
            let currentStartCol;

            if (i === 0) {
              currentStartCol = startDay;
              currentSpan = Math.min(duration, daysInFirstWeek);
            } else {
              currentStartCol = 1;
              const daysRemaining = duration - daysInFirstWeek - (i - 1) * 7;
              currentSpan = Math.min(daysRemaining, 7);
            }

            return (
              <Task
                id="1"
                title={task.title}
                style={{
                  gridColumn: `${currentStartCol} / span ${currentSpan}`,
                  gridRow: `${row + i}`,
                  marginTop: "16px",
                  width: "100%",
                  left: 0,
                }}
                className="absolute z-10 h-8 rounded-md border bg-blue-300 p-1"
              />
            );
          });
        })}
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
