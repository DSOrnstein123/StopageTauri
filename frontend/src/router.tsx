import {
  createHashHistory,
  createRouter,
  type AnyRouteMatch,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient } from "@tanstack/react-query";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    breadcrumb?: string;
    breadcrumbFn?: (match: AnyRouteMatch) => string;
  }
}

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: { queryClient },
  history: createHashHistory(),
});

export { queryClient, router };
