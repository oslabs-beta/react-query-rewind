<template></template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, defineProps, watch } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';
import { formatData } from './formatData';

const props = defineProps({
  contentConnected: Boolean,
});

const queryClient = useQueryClient();
const queryCache = queryClient.getQueryCache();
const contentMessageQueue: any = [];

const sendEvent = (data: any) => {
  window.postMessage(
    {
      framework: 'vue',
      type: 'event',
      payload: data,
    },
    '*'
  );
};

const handleQueryCacheChange = async (event: any) => {
  const message = formatData(event, queryClient);

  if (!message) return;
  if (!props.contentConnected) {
    contentMessageQueue.push(message);
  } else {
    console.log('MESSAGE', message);

    console.log('IS IT THIS EASY');
    sendEvent(message);
  }
};

watch(
  () => props.contentConnected,
  newVal => {
    if (newVal) {
      contentMessageQueue.forEach((message: any) => {
        sendEvent(message);
      });
      contentMessageQueue.length = 0;
    }
  }
);

onMounted(() => {
  const unsubscribe = queryCache.subscribe(handleQueryCacheChange);
  onBeforeUnmount(() => unsubscribe());
});
</script>

<style scoped></style>
