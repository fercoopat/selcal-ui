import { AppProvider } from "@/components/providers";
import { AppRouter } from "@/components/router";
import { AuthProvider } from "@/modules/auth/contexts/auth-context";

const App = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </AppProvider>
  );
};

export default App;
