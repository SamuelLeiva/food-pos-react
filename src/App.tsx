import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OrderMenuPanel } from "./features/menu/components/OrderMenuPanel";
import { CartProvider } from "./contexts/cart/CartProvider";
import { MainLayout } from "./components/MainLayout";
import { AuthProvider } from "./contexts/auth/AuthProvider.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <MainLayout>
            <OrderMenuPanel />
          </MainLayout>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
