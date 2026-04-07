import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { queryClient } from "../api/client";
import { CurrencyConverter } from "../features/CurrencyConverter/CurrencyConverter";
import { ExchangeRateList } from "../features/ExchangeRateList/ExchangeRateList";
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
            <ExchangeRateList />
          </Suspense>
        </ErrorBoundary>
      </S.PageLayout>
    </QueryClientProvider>
  );
};
