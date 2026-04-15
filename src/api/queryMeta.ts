import "@tanstack/react-query";

/**
 * Custom meta options for TanStack Query queries.
 *
 * @see https://tanstack.com/query/v5/docs/framework/react/typescript#typing-meta
 */
interface QueryMeta extends Record<string, unknown> {
  /**
   * Opt-in flag to persist this query's cache to localStorage.
   *
   * When true, the query cache survives page reloads and browser restarts.
   * Only queries with this flag set are persisted - all others are excluded.
   *
   * This enables selective persistence of expensive/frequently-used queries
   * while keeping default behavior (no persistence) for everything else.
   */
  persist?: boolean;
}

/**
 * Augments TanStack Query's built-in type definitions.
 * Adds our custom `persist` meta option to all queries.
 */
declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: QueryMeta;
    mutationMeta: QueryMeta;
  }
}

