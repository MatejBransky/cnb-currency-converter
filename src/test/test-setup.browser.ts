import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { queryClient } from "../api/client";
import { worker } from "./mocks/worker";

beforeAll(() => worker.start());
beforeEach(() => queryClient.clear());
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());
