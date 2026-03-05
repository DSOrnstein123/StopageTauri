import Page from "@/app/components/page/Page";
import setSidebarType from "@/shared/utils/setSidebarType";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(features)/documents")({
  component: Page,
  beforeLoad: () => {
    setSidebarType("none");
  },
});
