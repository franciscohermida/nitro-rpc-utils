<template>
  <div>{{ example1 }}</div>
  <div>{{ example2 }}</div>
</template>

<script setup lang="ts">
import type { AppRouter } from "~~/shared/appRouter";

const rpcClient = createNitroRPCClient<AppRouter>();

const { data: example1 } = useAsyncData(async () => {
  // Inspect the response type and autocompletion of fetchApi parameters. Date was serialized/deserialized with superjson
  const response = await rpcClient("/api/example1", { data: "hello world" });
  return response;
});

const { data: example2 } = useAsyncData(async () => {
  // Inspect the response type and autocompletion of fetchApi parameters. Date was serialized/deserialized with superjson
  const response = await rpcClient("/api/example2");
  return response;
});
</script>
