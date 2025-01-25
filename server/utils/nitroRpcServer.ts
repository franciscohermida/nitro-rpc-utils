import { AnySchema } from "yup";
import type { EventHandler, H3Event, EventHandlerRequest } from "h3";
import { yup } from "~~/shared/yup";
import type { NitroFetchRequest, InternalApi } from "nitropack/types";
import { superjson } from "~~/shared/superjson";

type NitroFetchRequestStringLiterals = Exclude<keyof InternalApi, `/_${string}` | `/api/_${string}`>;

type Route = {
  path: NitroFetchRequestStringLiterals;
  input: any;
  output: any;
};
export type RouteDataFromRoutes<TRoutes extends Route[]> = {
  [T in TRoutes[number] as T["path"]]: {
    input: T["input"];
    output: T["output"];
  };
};

export function RegisterRoute<Route>() {
  return {} as Route;
}

type EventHandlerWithInputSchema<T extends EventHandlerRequest, D, S extends AnySchema | undefined> = (
  event: H3Event<T>,
  opts: { input: S extends AnySchema ? yup.InferType<S> : undefined },
) => Promise<D>;

export function defineRPCEventHandler<
  P extends string,
  T extends EventHandlerRequest,
  D,
  S extends AnySchema | undefined = undefined,
>(path: NitroFetchRequestStringLiterals | P, inputSchema: S, handler: EventHandlerWithInputSchema<T, D, S>) {
  const e = defineEventHandler(async (event) => {
    // TODO: try catch this to properly handle errors
    let input: S extends AnySchema ? yup.InferType<S> : undefined;
    // try {
    if (inputSchema) {
      const reqBody = await readBody(event);
      try {
        input = (await inputSchema.validate(superjson.deserialize(reqBody), { stripUnknown: true })) as any;
      } catch (error) {
        console.log("error", error);
        throw createError({
          statusCode: 400,
          message: error.message,
        });
      }
    } else {
      input = undefined as any;
    }
    const result = await handler(event, { input });
    return superjson.serialize(result);
  });

  return {
    handler: e,
    _type: {
      path: path as unknown as Readonly<P>,
      input: undefined as S extends AnySchema ? yup.InferType<S> : undefined,
      output: undefined as Awaited<ReturnType<typeof handler>>,
    },
  };
}
