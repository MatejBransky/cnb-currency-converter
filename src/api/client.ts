import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import type { PersistQueryClientOptions } from "@tanstack/react-query-persist-client";

export const queryClient = new QueryClient();

/**
 * Exposes QueryClient globally for TanStack Query devtools.
 */
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/react-query").QueryClient;
  }
}
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

/*
 * AsyncStoragePersister that persists React Query cache to window.localStorage.
 */
export const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

/**
 * Queries persistence with the opt-in solution.
 * Only queries with the `meta.persist: true` are persisted.
 */
export const persistOptions: Omit<PersistQueryClientOptions, "queryClient"> = {
  persister,
  dehydrateOptions: {
    shouldDehydrateQuery(query) {
      if (typeof query.meta?.persist === "boolean") {
        return query.meta.persist;
      }
      return false;
    },
  },
};
