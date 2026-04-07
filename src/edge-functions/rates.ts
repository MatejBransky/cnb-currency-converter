import { type Config, type Context } from "@netlify/edge-functions";

export default async (_request: Request, ctx: Context) => {
  const cnbUrl = Netlify.env.get("CNB_RATES_URL");

  if (!cnbUrl) {
    const message = "URL for fetching CNB rates is not set";
    console.error(message);
    return new Response(message, { status: 500 });
  }

  const baseHeaders = {
    "Access-Control-Allow-Origin": ctx.site.url ?? "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const response = await fetch(cnbUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch CNB rates: ${response.status}`);
    }

    const rawData = await response.text();

    return new Response(rawData, {
      status: 200,
      headers: {
        ...baseHeaders,
        "Content-Type": "application/json",
        // docs: https://docs.netlify.com/build/caching/caching-overview
        "Netlify-CDN-Cache-Control": `public, durable, max-age=300, stale-while-revalidate=60`,
      },
    });
  } catch (error) {
    console.error("Error fetching CNB data:", error);
    return new Response("Error fetching CNB data", { status: 502 });
  }
};

export const config: Config = {
  path: "/rates",
  cache: "manual",
};
