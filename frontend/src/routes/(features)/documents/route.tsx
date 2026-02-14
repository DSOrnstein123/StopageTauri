import Page from "@/app/components/page/Page";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(features)/documents")({
  component: Page,
});
