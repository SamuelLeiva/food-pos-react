import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OrderMenuPanel } from "./features/Order/OrderMenuPanel";
import { MainLayout } from "./layouts/MainLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <OrderMenuPanel />
      </MainLayout>
    </QueryClientProvider>
  );
}

export default App;
