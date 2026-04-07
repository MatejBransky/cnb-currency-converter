import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { queryClient } from "../api/client";
import { CurrencyConverter } from "../ui/CurrencyConverter";
import { ErrorFallback } from "../ui/ErrorFallback";
import { GlobalStyle } from "../ui/GlobalStyle";
import { Loading } from "../ui/Loading";
import * as S from "./App.styles";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <S.PageLayout>
        <S.PageHeader>Currency Converter</S.PageHeader>

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loading />}>
            <CurrencyConverter />
          </Suspense>
        </ErrorBoundary>
      </S.PageLayout>
    </QueryClientProvider>
  );
};
