import { format, getDay, getDaysInMonth, isToday } from "date-fns";

interface CalendarDate {
  id: string;
  date: number;
  fullDate: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
}

const getCalendarDatesForMonth = (
  month: number,
  year: number,
): CalendarDate[] => {
  const monthIndex = month - 1;
  const datesInCurrentMonth = getDaysInMonth(new Date(year, monthIndex));

  const firstDayOfCurrentMonth = getDay(new Date(year, monthIndex, 1));
  const lastDayOfCurrentMonth = getDay(
    new Date(year, monthIndex, datesInCurrentMonth),
  );

  const prevMonthDays = Array.from(
    { length: firstDayOfCurrentMonth },
    (_, i) => {
      const date = new Date(year, monthIndex - 1, i + 1);
      return {
        id: format(date, "yyyy-MM-dd"),
        date:
          getDaysInMonth(new Date(year, month - 2)) -
          firstDayOfCurrentMonth +
          i +
          1,
        fullDate: date,
        isCurrentMonth: false,
        isToday: false,
      };
    },
  );

  const currentMonthDays = Array.from(
    { length: datesInCurrentMonth },
    (_, i) => {
      const date = new Date(year, monthIndex, i + 1);
      return {
        id: format(date, "yyyy-MM-dd"),
        date: i + 1,
        fullDate: date,
        isCurrentMonth: true,
        isToday: isToday(new Date(year, monthIndex, i + 1)),
      };
    },
  );

  const nextMonthDays = Array.from(
    { length: 7 - lastDayOfCurrentMonth - 1 },
    (_, i) => {
      const date = new Date(year, monthIndex + 1, i + 1);
      return {
        id: format(date, "yyyy-MM-dd"),
        date: i + 1,
        fullDate: date,
        isCurrentMonth: false,
        isToday: false,
      };
    },
  );

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};

export default getCalendarDatesForMonth;
