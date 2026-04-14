import { test, expect, vi } from "vitest";
import { getCacheConfig } from "./cache";

interface TestCase {
  now: {
    day: DayName;
    time: `${number}:${number}`;
  };
  declaredToday: boolean;
  expectedConfig: {
    ttl: Temporal.DurationLike;
    nextUpdateAt: Temporal.PlainDateTime;
  };
  description: string;
}

test.suite("getCacheDuration", () => {
  const testCases: TestCase[] = [
    {
      now: { day: "friday", time: "10:00" },
      declaredToday: false,
      expectedConfig: {
        ttl: { hours: 4, minutes: 30 },
        nextUpdateAt: Temporal.PlainDateTime.from("2026-04-10T14:30"),
      },
      description:
        "declaration not today, before 14:30 → cache until today 14:30",
    },
    {
      now: { day: "friday", time: "14:20" },
      declaredToday: false,
      expectedConfig: {
        ttl: { hours: 0, minutes: 10 },
        nextUpdateAt: Temporal.PlainDateTime.from("2026-04-10T14:30"),
      },
      description: "declaration not today, just before 14:30",
    },
    {
      now: { day: "friday", time: "14:30" },
      declaredToday: false,
      expectedConfig: {
        ttl: { minutes: 5 },
        nextUpdateAt: Temporal.PlainDateTime.from("2026-04-10T14:35"),
      },
      description: "declaration not today, at 14:30 → short cache",
    },
    {
      now: { day: "friday", time: "16:40" },
      declaredToday: false,
      expectedConfig: {
        ttl: { minutes: 5 },
        nextUpdateAt: Temporal.PlainDateTime.from("2026-04-10T16:45"),
      },
      description: "declaration not today, after 14:30 → short cache",
    },
    {
      now: { day: "friday", time: "10:00" },
      declaredToday: true,
      expectedConfig: {
        ttl: { days: 3, hours: 4, minutes: 30 },
        nextUpdateAt: Temporal.PlainDateTime.from("2026-04-13T14:30"),
      },
      description: "declaration today → skip weekend to Monday 14:30",
    },
    {
      now: { day: "friday", time: "14:20" },
      declaredToday: true,
      expectedConfig: {
        ttl: { days: 3, hours: 0, minutes: 10 },
        nextUpdateAt: Temporal.PlainDateTime.from("2026-04-13T14:30"),
      },
      description: "declaration today, before 14:30 → still next working day",
    },
    {
      now: { day: "friday", time: "14:30" },
      declaredToday: true,
      expectedConfig: {
        ttl: { days: 3 },
        nextUpdateAt: Temporal.PlainDateTime.from("2026-04-13T14:30"),
      },
      description: "declaration today, at 14:30 → next working day",
    },
    {
      now: { day: "thursday", time: "10:00" },
      declaredToday: false,
      expectedConfig: {
        ttl: { hours: 4, minutes: 30 },
        nextUpdateAt: Temporal.PlainDateTime.from("2026-04-09T14:30"),
      },
      description: "thursday, declaration yesterday → cache until today 14:30",
    },
    {
      now: { day: "sunday", time: "11:00" },
      declaredToday: false,
      expectedConfig: {
        ttl: { days: 1, hours: 3, minutes: 30 },
        nextUpdateAt: Temporal.PlainDateTime.from("2026-04-13T14:30"),
      },
      description: "sunday, declaration on friday -> cache until monday 14:30",
    },
    {
      now: { day: "monday", time: "09:00" },
      declaredToday: false,
      expectedConfig: {
        ttl: { hours: 5, minutes: 30 },
        nextUpdateAt: Temporal.PlainDateTime.from("2026-04-06T14:30"),
      },
      description:
        "monday, declaration friday → cache until today 14:30 (skipped weekend)",
    },
  ];

  testCases.forEach(({ now, declaredToday, expectedConfig, description }) => {
    test(description, () => {
      const nowDate = getDateForDay(now.day);
      const systemTimeMillis = Temporal.PlainDateTime.from(
        `${nowDate.toString()}T${now.time}`,
      ).toZonedDateTime("Europe/Prague").epochMilliseconds;

      vi.setSystemTime(systemTimeMillis);

      const declarationDate = declaredToday
        ? nowDate
        : nowDate.subtract({ days: 1 });

      const cacheConfig = getCacheConfig(declarationDate);
      const expected = Temporal.Duration.from(expectedConfig.ttl);

      expect(cacheConfig.ttl.total("seconds")).toBe(expected.total("seconds"));
      expect(cacheConfig.nextUpdateAt.toPlainDateTime()).toEqual(
        expectedConfig.nextUpdateAt,
      );
    });
  });
});

const dayOffsets = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
} as const;

type DayName = keyof typeof dayOffsets;

const MONDAY_REFERENCE = Temporal.PlainDate.from("2026-04-06");

function getDateForDay(day: DayName): Temporal.PlainDate {
  return MONDAY_REFERENCE.add({ days: dayOffsets[day] });
}
