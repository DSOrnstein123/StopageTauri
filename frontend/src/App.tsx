import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./router";
import "dockview/dist/styles/dockview.css";
import MainLayout from "./app/components/main-layout/MainLayout";
import "./custom-dockview.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
