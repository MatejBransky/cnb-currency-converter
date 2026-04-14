import z from "zod";

export const TemporalPlainDate = z.codec(
  z.iso.date(),
  z.custom<Temporal.PlainDate>((val) => val instanceof Temporal.PlainDate),
  {
    decode: (input) => Temporal.PlainDate.from(input),
    encode: (output) => output.toJSON(),
  },
);

export const TemporalInstant = z.codec(
  z.iso.datetime(),
  z.custom<Temporal.Instant>((val) => val instanceof Temporal.Instant),
  {
    decode: (input) => Temporal.Instant.from(input),
    encode: (output) => output.toJSON(),
  },
);

export const TemporalDuration = z.codec(
  z.iso.duration(),
  z.custom<Temporal.Duration>((val) => val instanceof Temporal.Duration),
  {
    decode: (input) => Temporal.Duration.from(input),
    encode: (output) => output.toJSON(),
  },
);
