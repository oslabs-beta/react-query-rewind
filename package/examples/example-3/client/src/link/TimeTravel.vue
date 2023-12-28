<script>
import { onMounted, onBeforeUnmount } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';

export default {
  name: 'TimeTravel',
  setup() {
    const queryClient = useQueryClient();

    onMounted(() => {
      const listener = event => {
        const currentQuery = event.detail.currentQuery;
        currentQuery.forEach(queryState => {
          if (queryState.queryData !== '') {
            queryClient.setQueryData(
              [queryState.queryKey.slice(2, -2)],
              queryState.queryData
            );
          }
        });
      };
      window.addEventListener('UpdateUI', listener);

      onBeforeUnmount(() => {
        window.removeEventListener('UpdateUI', listener);
      });
    });

    return {};
  },
};
</script>
