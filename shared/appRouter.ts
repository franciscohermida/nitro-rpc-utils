import type { RouteExample } from "~~/server/api/example";

const routes = [
  // register routes on this array
  RegisterRoute<RouteExample>(),
];

export type AppRouter = RouteDataFromRoutes<typeof routes>;
