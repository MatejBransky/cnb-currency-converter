import { type Config, type Context } from "@netlify/edge-functions";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (_request: Request, _ctx: Context) => {
  const cnbUrl = Netlify.env.get("CNB_RATES_URL");

  if (!cnbUrl) {
    const message = "URL for fetching CNB rates is not set";
    console.error(message);
    return new Response(message, { status: 500 });
  }

  return fetch(cnbUrl);
};

export const config: Config = {
  path: "/rates",
};
