import { createFileRoute } from "@tanstack/react-router";
import Calendar from "./-components/calendar/Calendar";

export const Route = createFileRoute("/(features)/planner")({
  component: Calendar,
});
