<template>
  <!-- Add VueQueryRewind to application -->
  <VueQueryRewind />

  <div>{{ data }}</div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

// Import VueQueryRewind
// @ts-ignore
import { VueQueryRewind } from '@react-query-rewind/vue-query-rewind';

const fetcher = async () =>
  await fetch('https://jsonplaceholder.typicode.com/posts').then(response =>
    response.json()
  );

const { data, suspense } = useQuery({ queryKey: ['test'], queryFn: fetcher });

await suspense();
</script>
