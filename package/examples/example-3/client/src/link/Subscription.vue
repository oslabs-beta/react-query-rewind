<script>
import { onMounted, onBeforeUnmount } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';
import { formatData } from './formatData';

export default {
  name: 'Subscription',
  setup() {
    const queryClient = useQueryClient();
    const queryCache = queryClient.getQueryCache();

    const handleQueryCacheChange = event => {
      const data = formatData(event, queryClient);
      if (data) {
        window.postMessage(
          {
            type: 'react-query-rewind',
            payload: data,
          },
          '*'
        );
      }
    };

    onMounted(() => {
      const unsubscribe = queryCache.subscribe(handleQueryCacheChange);
      return () => unsubscribe();
    });

    return {};
  },
};
</script>
