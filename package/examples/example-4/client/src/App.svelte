<script lang="ts">
  import { writable, derived } from 'svelte/store';
  import PostsOne from './components/PostsOne.svelte';
  import PostsTwo from './components/PostsTwo.svelte';
  import PostsThree from './components/PostsThree.svelte';

  // Define a store for screenView
  const screenView = writable('Posts One');

  // Define a store for queryData (assuming queryData structure)
  const queryData = writable({});

  // Fetch data - replace with your actual data fetching logic
  async function fetchData() {
    const response = await fetch('your-data-endpoint');
    const data = await response.json();
    // Process and update queryData
  }

  // Call fetchData on component mount
  onMount(() => {
    fetchData();
  });

  // Handle navigation click
  function handleNavClick(view: string) {
    screenView.set(view);
  }
</script>

<div class="window">
  <div class="nav-bar">
    <span class="title">Svelte Query Rewind</span>
    <div class="nav-options">
      <div class="nav-option" on:click={() => handleNavClick('Posts One')} class:active={$screenView === 'Posts One'}>Feed 1</div>
      <div class="nav-option" on:click={() => handleNavClick('Posts Two')} class:active={$screenView === 'Posts Two'}>Feed 2</div>
      <div class="nav-option" on:click={() => handleNavClick('Posts Three')} class:active={$screenView === 'Posts Three'}>Feed 3</div>
    </div>
  </div>

  {#if $screenView === 'Posts One'}
    <PostsOne />
  {:else if $screenView === 'Posts Two'}
    <PostsTwo />
  {:else if $screenView === 'Posts Three'}
    <PostsThree />
  {/if}
</div>

<style>
  /* Your CSS here */
</style>
