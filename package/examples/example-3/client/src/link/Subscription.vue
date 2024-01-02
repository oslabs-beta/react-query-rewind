<template>
  <!-- component does not render anything -->
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';
import { formatData } from './formatData';

onMounted(() => {
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();
  let initialMessageSent = false;

  const handleQueryCacheChange = async (event: any) => {
    if (!initialMessageSent) {
      await new Promise(resolve => setTimeout(resolve, 250));
      initialMessageSent = true;
    }

    const data = formatData(event, queryClient);
    if (data) {
      window.postMessage(
        {
          framework: 'vue',
          type: 'event',
          payload: data,
        },
        '*'
      );
    }
  };

  const unsubscribe = queryCache.subscribe(handleQueryCacheChange);

  onBeforeUnmount(() => unsubscribe());
});
</script>

<style scoped>
/* component does not render anything */
</style>
