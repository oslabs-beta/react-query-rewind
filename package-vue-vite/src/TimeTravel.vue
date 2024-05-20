<template></template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';
// import { QueryDisplay } from './types';

export type QueryDisplay = {
  queryKey: string;
  queryData: any;
};

const queryClient = useQueryClient();

const handleUpdateUi = (message: any) => {
  if (message.data?.type === 'update-ui') {
    const currentQuery: QueryDisplay[] = message.detail;
    currentQuery.forEach(queryState => {
      if (queryState.queryData !== '') {
        queryClient.setQueryData(
          [queryState.queryKey.slice(2, -2)],
          queryState.queryData
        );
      }
    });
  }
};

onMounted(() => {
  window.addEventListener('message', handleUpdateUi);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handleUpdateUi);
});
</script>

<style scoped></style>
