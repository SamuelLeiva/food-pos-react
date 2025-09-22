import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OrderMenuPanel } from "./features/menu/components/OrderMenuPanel";
import { MainLayout } from "./layouts/MainLayout";
import { AuthProvider } from "./contexts/auth/AuthProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MainLayout>
          <OrderMenuPanel />
        </MainLayout>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
