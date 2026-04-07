const UPDATE_TIME = "14:30";

/** Short cache if data not yet updated */
const WORKDAY_CACHE = { minutes: 5 };

/**
 * Returns the cache duration until the next CNB update.
 * - If declaration date is today → cache until next working day's 14:30
 * - Otherwise → short cache (default 5 minutes) until data is updated
 * - Weekends are skipped (CNB does not update rates)
 */
export function getCacheDuration(declarationDate: Temporal.PlainDate) {
  const now = Temporal.Now.zonedDateTimeISO();

  let nextRef = now.withPlainTime(UPDATE_TIME);

  // If declaration date is today or is weekend → cache until next working day's 14:30
  if (declaredToday() || isWeekend(now.toPlainDate())) {
    const nextWorkingDay = getNextWorkingDay(now.toPlainDate());
    nextRef = nextWorkingDay.toZonedDateTime({
      timeZone: "Europe/Prague",
      plainTime: UPDATE_TIME,
    });
  } else if (afterUpdateTime(now)) {
    nextRef = now.add(WORKDAY_CACHE);
  }

  const remainingDuration = nextRef.since(now, { smallestUnit: "seconds" });

  console.log({
    now: now.toLocaleString("en-US"),
    declarationDate: declarationDate.toLocaleString("en-US"),
    nextRef: nextRef.toLocaleString("en-US"),
    remaining: remainingDuration.toLocaleString("en-US"),
  });

  return remainingDuration;

  function declaredToday() {
    return Temporal.PlainDate.compare(now.toPlainDate(), declarationDate) === 0;
  }
}

function isWeekend(date: Temporal.PlainDate) {
  return date.dayOfWeek === 6 || date.dayOfWeek === 7;
}

function afterUpdateTime(datetime: Temporal.ZonedDateTime) {
  return (
    Temporal.ZonedDateTime.compare(datetime, datetime.withPlainTime("14:30")) >=
    0
  );
}

function getNextWorkingDay(date: Temporal.PlainDate): Temporal.PlainDate {
  let next = date.add({ days: 1 });
  while (isWeekend(next)) next = next.add({ days: 1 });
  return next;
}
