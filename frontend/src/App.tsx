import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./system/config/queryClient";
import MainLayout from "./app/layout/MainLayout";
import { TooltipProvider } from "@system/ui/shadcn/tooltip";
import { pluginRegistry } from "@system/registries/pluginRegistry";
import { bootstrapPlugin } from "@app/bootstrap";

bootstrapPlugin(pluginRegistry);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MainLayout />
      </TooltipProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
