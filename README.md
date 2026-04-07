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
