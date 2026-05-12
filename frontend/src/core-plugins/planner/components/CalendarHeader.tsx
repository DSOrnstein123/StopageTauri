import { ArrowLeft, ArrowRight } from "lucide-react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarHeaderProps {
  month: number;
  year: number;
  onNext: () => void;
  onPrev: () => void;
}

const CalendarHeader = ({
  month,
  year,
  onNext,
  onPrev,
}: CalendarHeaderProps) => {
  return (
    <div className="sticky top-0 left-0 z-100 flex flex-col bg-white">
      <div className="flex h-6">
        <ArrowLeft onClick={onNext} />
        <span>{`${month}, ${year}`}</span>
        <ArrowRight onClick={onPrev} />
      </div>

      <div className="grid h-6 grid-cols-7">
        {days.map((day) => (
          <div className="border-t border-r border-b pl-1 text-sm leading-6 font-medium">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarHeader;
