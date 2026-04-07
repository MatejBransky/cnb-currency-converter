import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { fixture } from "./fixture";

export const worker = setupWorker(
  http.get("/rates", () => HttpResponse.json(fixture)),
);
