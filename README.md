# CNB Currency Converter

[![Netlify Status](https://api.netlify.com/api/v1/badges/38346b95-fa47-47d6-b65e-d802d30f5c4f/deploy-status)](https://app.netlify.com/projects/currency-converter-cnb/deploys)

A simple React application that converts CZK to foreign currencies using the latest exchange rates from the Czech National Bank (CNB).

The app fetches daily exchange rate data, parses it, and provides a clean UI for browsing rates and converting amounts.

## Assignment

This project was created as part of a technical assignment:

> Create a React app that retrieves CNB exchange rates, displays them, and allows CZK conversion.  
> Use React, TypeScript, Styled Components, and React Query.  
> Include tests and deploy the app.

## Live Demo

Netlify: [currency-converter-cnb.netlify.app](https://currency-converter-cnb.netlify.app)

## Architecture & Key Decisions

### CNB API limitations

The CNB endpoint has several practical limitations:

- No CORS support
- Non-JSON (TXT, CSV-like) format
- Fixed cache TTL (24h), which does not reflect real update time (~14:30 on working days)

### Edge proxy & data transformation

A Netlify Edge Function is used to:

- Proxy the CNB API (CORS workaround)
- Transform TXT data into structured JSON
- Validate data using Zod schemas

This keeps the frontend clean and focused on UI and domain logic.

### Caching strategy

The CNB API uses a static 24h cache TTL, which can lead to stale data if cached before/after the daily update (~14:30).

Simple approach:

- Short static TTL (e.g. 5 minutes)

Advanced improvement:

- Dynamic TTL based on expected next CNB update time

## Tech Stack

- React (+ Hooks, Suspense, Error Boundaries)
- TypeScript
- TanStack Query (data fetching & caching)
- Zod (runtime validation)
- Styled Components
- Open Props (CSS variables)
- Temporal API (via polyfill)

Testing:

- Vitest (unit + browser tests)
- MSW (API mocking)

Infrastructure:

- Netlify (SPA hosting)
- Netlify Edge Functions (API proxy & transformation)

## Design Notes

This project intentionally explores modern web platform features:

- Customizable `<select>` styling using emerging CSS capabilities
- Temporal API for date/time handling

Some of these features are not yet fully supported across all browsers.  
In a production environment, technology choices would be aligned with target browser support requirements.

## Getting Started

```bash
pnpm install
```

### Create environment variables

```bash
cp .env.example .env
```

Then set the CNB API endpoint:
`CNB_RATES_URL={CNB-API-endpoint-URL}`.
The environment variable is used by the Edge Function to fetch CNB data.

### Development

```bash
pnpm dev
```

---

### Testing

```bash
pnpm test
```
