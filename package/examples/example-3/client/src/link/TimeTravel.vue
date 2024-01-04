<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';
import { QueryDisplay } from './types';

const queryClient = useQueryClient();

onMounted(() => {
  console.log('TIME TRAVEL MOUNTED');

  const updateUi = (event: any) => {
    const currentQuery: QueryDisplay[] = event.detail;
    currentQuery.forEach(queryState => {
      if (queryState.queryData !== '') {
        queryClient.setQueryData(
          [queryState.queryKey.slice(2, -2)],
          queryState.queryData
        );
      }
    });
  };
  window.addEventListener('update-ui', updateUi);

  onBeforeUnmount(() => {
    window.removeEventListener('update-ui', updateUi);
  });
});
</script>
