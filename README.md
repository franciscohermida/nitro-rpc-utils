# Nitro RPC Utils

A lightweight(POC) TypeScript RPC implementation for Nitro/Nuxt projects, inspired by tRPC. This proof-of-concept demonstrates how to achieve end-to-end type safety with Nitro's event handlers.

Always enjoyed working with TRPC and now that I'm working on a nuxt project was curious if I could create something similar. Put this quick POC together after studying for a couple of hours testing deepseek AI for the 1st time.

> ⚠️ **Note**: This is a proof-of-concept and not production ready.

## Features

- Full end-to-end type safety with TypeScript
- Automatic serialization/deserialization using SuperJSON
- Input validation using Yup (easily adaptable to Zod or other validators)
- Autocomplete support for:
  - API route paths
  - Input types
  - Output types

## Installation

Copy the following directories into your project:
```bash
shared/
server/utils/
app/utils/
```

## Usage

### 1. Server-side Setup

Create event handlers using `defineRPCEventHandler`. Example (`server/api/example1.ts`):

```typescript
import { yup } from "~~/shared/yup";

export type RouteExample1 = typeof e._type;

const e = defineRPCEventHandler(
  "/api/example1",
  yup
    .object({
      data: yup.string().required(),
    })
    .required(),

  async (event, { input }) => {
    console.log("/api/example input", input);
    return { msg: input.data, date: new Date() };
  }
);

export default e.eventHandler;
```
> **Important**: Remember to export the type for each event handler.

### 2. Register Routes

Create a router by registering your routes (`shared/appRouter.ts`):

```typescript
import type { RouteExample1 } from "~~/server/api/example1";
import type { RouteExample2 } from "~~/server/api/example2";

const routes = [
  // register routes on this array
  RegisterRoute<RouteExample1>(),
  RegisterRoute<RouteExample2>(),
];

export type AppRouter = RouterFromRoutes<typeof routes>;
```

### 3. Client-side Usage

Create and use the RPC client:

```typescript
import type { AppRouter } from "~~/shared/appRouter";

const rpcClient = createNitroRPCClient<AppRouter>();

// Example usage with full type safety
const data = await rpcClient("/api/example1", { data: "hello world" });
// - Path autocomplete
// - Input type validation
// - Fully typed response
```
