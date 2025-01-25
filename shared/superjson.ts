import * as superjson from "superjson";

export { superjson };

export function superjsonClone<T>(value: T) {
  return superjson.parse(superjson.stringify(value)) as T;
}
