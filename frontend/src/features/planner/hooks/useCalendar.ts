import { getMonth, getYear } from "date-fns";
import { useState } from "react";

export const useCalendar = () => {
  const now = new Date();
  const [month, setMonth] = useState(getMonth(now) + 1);
  const [year, setYear] = useState(getYear(now));

  const nextMonth = () => setMonth((prev) => (prev === 12 ? 1 : prev + 1));
  const prevMonth = () => setMonth((prev) => (prev === 1 ? 12 : prev - 1));

  return { month, year, setYear, nextMonth, prevMonth };
};
