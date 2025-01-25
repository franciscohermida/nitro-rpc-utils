<template>
  <div>{{ data }}</div>
</template>

<script setup lang="ts">
import type { AppRouter } from "~~/shared/appRouter";

const fetchApi = createFetchApi<AppRouter>();
const { data } = useAsyncData(async () => {
  // Inspect the response type and autocompletion of fetchApi parameters. Date was serialized/deserialized with superjson
  const response = await fetchApi("/api/example", { data: "hello world" });
  return response;
});
</script>
