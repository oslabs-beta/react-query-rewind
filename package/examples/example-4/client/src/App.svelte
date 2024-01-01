<script lang="ts">
  import { QueryClientProvider, QueryClient } from "@tanstack/svelte-query";
  import { writable } from "svelte/store";
  import PostsOne from "./components/PostsOne.svelte";
  import PostsTwo from "./components/PostsTwo.svelte";
  import PostsThree from "./components/PostsThree.svelte";
  import SvelteQueryRewind from "./link/SvelteQueryRewind.svelte";

  const queryClient: QueryClient = new QueryClient();

  const screenView = writable("Posts One");

  function handleNavClick(view: string) {
    screenView.set(view);
  }
</script>

<QueryClientProvider client={queryClient}>
  <SvelteQueryRewind />

  <div class="window">
    <div class="nav-bar">
      <span class="title">Svelte Query Rewind</span>
      <div class="nav-options">
        <button
          class="nav-option"
          on:click={() => handleNavClick("Posts One")}
          class:active={$screenView === "Posts One"}
        >
          Feed 1
        </button>
        <button
          class="nav-option"
          on:click={() => handleNavClick("Posts Two")}
          class:active={$screenView === "Posts Two"}
        >
          Feed 2
        </button>
        <button
          class="nav-option"
          on:click={() => handleNavClick("Posts Three")}
          class:active={$screenView === "Posts Three"}
        >
          Feed 3
        </button>
      </div>
    </div>

    {#if $screenView === "Posts One"}
      <PostsOne />
    {:else if $screenView === "Posts Two"}
      <PostsTwo />
    {:else if $screenView === "Posts Three"}
      <PostsThree />
    {/if}
  </div>
</QueryClientProvider>

<style>
</style>
