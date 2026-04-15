import { ExchangeRateFixing } from "../model/ExchangeRateFixing";

/**
 * Calculates milliseconds until the next CNB rate update.
 *
 * Parses raw API response to extract `nextUpdateAt` from metadata,
 * then computes time difference from current instant.
 * Returns null if data is invalid or parsing fails.
 *
 * @param data - Raw API response data
 * @returns Milliseconds until next update, or null if invalid
 */
export const getTimeUntilNextUpdate = (data: unknown): number | null => {
  const parsed = ExchangeRateFixing.safeParse(data);

  if (parsed.error) {
    console.warn("Invalid data", parsed.error.issues);
    return null;
  }

  const { nextUpdateAt } = parsed.data.meta;
  const now = Temporal.Now.instant();

  return Math.max(nextUpdateAt.since(now).total({ unit: "milliseconds" }), 0);
};

