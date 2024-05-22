<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery } from '@tanstack/vue-query';

// Import was throwing a type error so we ignored it - this is from the docs so did not change it
// @ts-ignore
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';

// Import VueQueryRewind
// @ts-ignore
import { VueQueryRewind } from '@react-query-rewind/vue-query-rewind';

export default defineComponent({
  name: 'App',
  // Register VueQueryRewind
  components: { VueQueryDevtools, VueQueryRewind },
  setup() {
    const { data, error, isFetching, isPending } = useQuery({
      queryKey: ['repoData'],
      async queryFn() {
        return await fetch('https://api.github.com/repos/Tanstack/query').then(
          response => response.json()
        );
      },
    });

    return {
      data,
      error,
      isFetching,
      isPending,
    };
  },
});
</script>

<template>
  <!-- Add VueQueryRewind to application -->
  <VueQueryRewind />

  <template v-if="isPending"> Loading... </template>
  <template v-else-if="error">
    'An error has occurred: {{ error.message }}
  </template>
  <template v-else>
    <h1>{{ data.name }}</h1>
    <p>{{ data.description }}</p>
    <strong>👀 {{ data.subscribers_count }}</strong>
    <strong>✨ {{ data.stargazers_count }}</strong>
    <strong>🍴 {{ data.forks_count }}</strong>
    <div>{{ isFetching ? 'Updating...' : '' }}</div>
  </template>
  <VueQueryDevtools />
</template>
