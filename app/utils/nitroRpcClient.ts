import type { InternalApi } from "nitropack/types";
import { superjson } from "~~/shared/superjson";

type NitroFetchRequestStringLiterals = Exclude<keyof InternalApi, `/_${string}` | `/api/_${string}`>;

export function createNitroRPCClient<
  TRouter extends {
    [K in keyof TRouter]: {
      input: any;
      output: any;
    };
  },
>() {
  return async function nitroRPCClient<K extends keyof TRouter>(
    path: K,
    data?: TRouter[K]["input"],
  ): Promise<TRouter[K]["output"]> {
    const serialized = superjson.serialize(data);

    const result = await $fetch(path as unknown as NitroFetchRequestStringLiterals, {
      method: data ? "POST" : "GET",
      body: data != null ? serialized : undefined,
    });

    return superjson.deserialize(result);
  };
}
