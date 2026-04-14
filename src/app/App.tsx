import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { persister, queryClient } from "../api/client";
import { CurrencyConverter } from "../features/CurrencyConverter/CurrencyConverter";
import { ExchangeRateList } from "../features/ExchangeRateList/ExchangeRateList";
import { ErrorFallback } from "../ui/ErrorFallback";
import { GlobalStyle } from "../ui/GlobalStyle";
import { Loading } from "../ui/Loading";
import * as S from "./App.styles";

export const App = () => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            return query.queryKey.at(0) === "rates";
          },
        },
      }}
    >
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
    </PersistQueryClientProvider>
  );
};
