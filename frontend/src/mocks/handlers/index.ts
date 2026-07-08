import { loginHandlers } from "./loginHandlers";
import { sessionHandlers } from "./sessionHandlers";

export const handlers = [...loginHandlers, ...sessionHandlers];
