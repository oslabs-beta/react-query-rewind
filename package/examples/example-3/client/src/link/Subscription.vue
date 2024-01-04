<template></template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, defineProps } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';
import { formatData } from './formatData';

const props = defineProps({
  contentConnected: Boolean,
});

const queryClient = useQueryClient();
const queryCache = queryClient.getQueryCache();
const contentMessageQueue = [];

const handleQueryCacheChange = async (event: any) => {
  const data = formatData(event, queryClient);
  if (!data) return;

  if (!props.contentConnected) {
    console.log('APP: Added Event To Queue');
    contentMessageQueue.push(data);
  } else {
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

onMounted(() => {
  const unsubscribe = queryCache.subscribe(handleQueryCacheChange);
  onBeforeUnmount(() => unsubscribe());
});
</script>

<style scoped></style>
