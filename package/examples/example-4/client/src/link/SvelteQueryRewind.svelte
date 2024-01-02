<script lang="ts">
  import { onMount } from "svelte";
  import Subscription from "./Subscription.svelte";
  import TimeTravel from "./TimeTravel.svelte";

  let timeTravel: boolean = false;

  onMount(() => {
    const toggleTimeTravel: EventListener = (event: any) => {
      timeTravel = event.detail;
    };

    window.addEventListener("time-travel", toggleTimeTravel);

    const sendAppConnectedMessage = async () => {
      await new Promise<void>((resolve) => setTimeout(resolve, 125));
      window.postMessage(
        {
          framework: "svelte",
          type: "app-connected",
        },
        "*",
      );
    };

    sendAppConnectedMessage();

    return () => {
      window.removeEventListener("time-travel", toggleTimeTravel);
    };
  });
</script>

{#if timeTravel}
  <TimeTravel />
{:else}
  <Subscription />
{/if}
