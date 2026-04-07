import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense, type PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { queryClient } from "../api/client";
import { ErrorFallback } from "../ui/ErrorFallback";
import { GlobalStyle } from "../ui/GlobalStyle";
import { Loading } from "../ui/Loading";

export const TestProviders = (props: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>{props.children}</Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};
