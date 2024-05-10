<script lang="ts">
  import { onMount } from "svelte";
  import type { QueryDisplay } from "./types";
  import { useQueryClient } from "@tanstack/svelte-query";

  const queryClient = useQueryClient();

  onMount(() => {
    // console.log("TIME TRAVEL MOUNTED");

    const updateUi = (event: any) => {
      const currentQuery: QueryDisplay[] = event.detail;
      currentQuery.forEach((queryState) => {
        if (queryState.queryData !== "") {
          queryClient.setQueryData(
            [queryState.queryKey.slice(2, -2)],
            queryState.queryData,
          );
        }
      });
    };

    window.addEventListener("update-ui", updateUi);

    return () => {
      window.removeEventListener("update-ui", updateUi);
    };
  });
</script>
