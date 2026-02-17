import { Suspense } from "react";
import { BrowserRouter } from "react-router";

import { PageLoader } from "@/components/loaders";
import QueryProvider from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <QueryProvider>
        <ThemeProvider defaultTheme="light">
          <Suspense fallback={<PageLoader size="screen" />}>
            {children}
          </Suspense>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </QueryProvider>
    </BrowserRouter>
  );
};
export default AppProvider;
