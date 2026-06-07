import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./components/ui/sonner.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import ThemeProvider from "./components/shared/ThemeProvider.tsx";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "./components/shared/ErrorFallback.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}>
      <ClerkProvider
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            {import.meta.env.DEV && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
            <RouterProvider router={router} />
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </ClerkProvider>
    </ErrorBoundary>
  </StrictMode>,
);
