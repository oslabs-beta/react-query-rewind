<script>
import { onMounted, onBeforeUnmount } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';
import { formatData } from './formatData';

export default {
  name: 'VueQueryRewind',
  setup() {
    const queryClient = useQueryClient();
    const queryCache = queryClient.getQueryCache();

    const handleQueryCacheChange = event => {
      const data = formatData(event, queryClient);
      console.log(event);
      if (data) {
        window.postMessage(
          {
            type: 'vue-query-rewind',
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
