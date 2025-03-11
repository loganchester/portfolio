import { ThemeProvider } from "@/context/theme";
import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";

export function withProviders<P extends React.HTMLAttributes<unknown>>(
  Component: React.ComponentType<P>
) {
  return (props: P) => (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
              retry: 0,
            },
          },
        })
      }
    >
      <ThemeProvider>
        <Component {...props} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
