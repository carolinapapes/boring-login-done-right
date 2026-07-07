import "@testing-library/jest-dom/vitest";

import { afterAll, afterEach, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "@/mocks/server";

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "error",
  });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver =
    ResizeObserverMock as unknown as typeof ResizeObserver;
}
