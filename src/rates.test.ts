import type { Context } from "@netlify/edge-functions";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import edgeFunction from "./edge-functions/rates";

vi.stubGlobal("Netlify", {
  env: {
    get: vi.fn(),
  },
});

const spyNetlifyUrl = vi.spyOn(Netlify.env, "get");
beforeAll(() => {
  spyNetlifyUrl.mockImplementation(() => "https://cnb.example.com");
});
afterEach(() => spyNetlifyUrl.mockClear());
afterAll(() => spyNetlifyUrl.mockRestore());

// --- MSW server ---
const server = setupServer();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Exchange Rates Edge Function", () => {
  const mockCtx = {
    site: { url: "https://myapp.netlify.app" },
  } as Context;

  it("returns 500 if CNB_RATES_URL is not set", async () => {
    spyNetlifyUrl.mockImplementationOnce(() => undefined);

    const res = await edgeFunction(
      new Request("https://myapp.netlify.app/rates"),
      mockCtx,
    );
    expect(res.status).toBe(500);
    const text = await res.text();
    expect(text).toContain("URL for fetching CNB rates is not set");
  });

  it("returns 502 if fetch fails", async () => {
    server.use(
      http.get("https://myapp.netlify.app/rates", () => HttpResponse.error()),
    );

    const res = await edgeFunction(
      new Request("https://myapp.netlify.app/rates"),
      mockCtx,
    );
    expect(res.status).toBe(502);
    const text = await res.text();
    expect(text).toContain("Error fetching CNB data");
  });

  it("returns 200 with data, headers and TTL", async () => {
    server.use(
      http.get("https://cnb.example.com", () =>
        HttpResponse.text(`02 Apr 2026 #65
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.633
Brazil|real|1|BRL|4.109`),
      ),
    );

    const res = await edgeFunction(new Request("https://example.com"), mockCtx);
    const headers = res.headers;

    expect(res.status).toBe(200);
    expect(headers.get("Content-Type")).toBe("application/json");
    expect(headers.get("Access-Control-Allow-Origin")).toBe(mockCtx.site.url);
    expect(headers.get("Access-Control-Allow-Methods")).toBe("GET");
    expect(headers.get("Netlify-CDN-Cache-Control")).toMatch(
      /public, durable, max-age=\d+, stale-while-revalidate=60/,
    );
  });
});
