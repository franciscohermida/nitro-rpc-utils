import type { RouteExample1 } from "~~/server/api/example1";
import type { RouteExample2 } from "~~/server/api/example2";

const routes = [
  // register routes on this array
  RegisterRoute<RouteExample1>(),
  RegisterRoute<RouteExample2>(),
];

export type AppRouter = RouterFromRoutes<typeof routes>;
