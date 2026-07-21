import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./system/config/queryClient";
import MainLayout from "./app/shell/MainLayout";
import { TooltipProvider } from "@system/shared/ui/shadcn/tooltip";
import { pluginManager } from "@system/plugin-manager/pluginManager";
import { bootstrapPlugin } from "@app/bootstrap";

bootstrapPlugin(pluginManager);

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
