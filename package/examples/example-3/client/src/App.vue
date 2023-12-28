<template>
  <div class="window">
    <div class="nav-bar">
      <span class="title">Vue Query Rewind</span>
      <div class="nav-options">
        <div
          :class="{ 'nav-option': true, active: screenView === 'Posts One' }"
          @click="handleNavClick('Posts One')"
        >
          Feed 1
        </div>
        <div
          :class="{ 'nav-option': true, active: screenView === 'Posts Two' }"
          @click="handleNavClick('Posts Two')"
        >
          Feed 2
        </div>
        <div
          :class="{ 'nav-option': true, active: screenView === 'Posts Three' }"
          @click="handleNavClick('Posts Three')"
        >
          Feed 3
        </div>
      </div>
    </div>

    <component :is="currentScreenComponent"></component>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import PostsOne from './components/PostsOne.vue';
import PostsTwo from './components/PostsTwo.vue';
import PostsThree from './components/PostsThree.vue';

import { useQueryClient } from '@tanstack/vue-query';
import { formatData } from './link/formatData';

const screenView = ref('Posts One');

const handleNavClick = (screenName: string) => {
  screenView.value = screenName;
};

const currentScreenComponent = computed(() => {
  switch (screenView.value) {
    case 'Posts One':
      return PostsOne;
    case 'Posts Two':
      return PostsTwo;
    case 'Posts Three':
      return PostsThree;
    default:
      return null;
  }
});

onMounted(() => {
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();

  const handleQueryCacheChange = (event: any) => {
    const data = formatData(event, queryClient);
    if (data) {
      console.log(data);
      window.postMessage(
        {
          type: 'vue-query-rewind',
          payload: data,
        },
        '*'
      );
    }
  };

  const unsubscribe = queryCache.subscribe(handleQueryCacheChange);

  onBeforeUnmount(() => {
    unsubscribe();
  });
});
</script>

<style scoped></style>
