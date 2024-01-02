<script lang="ts">
  import { onMount } from "svelte";
  import formatData from "./formatData";
  import { useQueryClient } from "@tanstack/svelte-query";

  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();

  onMount(() => {
    const handleQueryCacheChange = async (event: any) => {
      await new Promise<void>((resolve) => setTimeout(resolve, 250));

      const data = formatData(event, queryClient);
      if (data) {
        window.postMessage(
          {
            framework: "svelte",
            type: "event",
            payload: data,
          },
          "*",
        );
      }
    };

    const unsubscribe = queryCache.subscribe(handleQueryCacheChange);

    return () => {
      unsubscribe();
    };
  });
</script>
