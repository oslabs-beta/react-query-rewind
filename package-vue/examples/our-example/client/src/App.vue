<template>
  <VueQueryRewind />

  <div class="window">
    <div class="nav-bar">
      <span class="title">Vue Query Rewind</span>
      <div class="nav-options">
        <div
          :class="{ 'nav-option': true, active: screenView === 'Feed One' }"
          @click="handleNavClick('Feed One')"
        >
          Feed 1
        </div>
        <div
          :class="{ 'nav-option': true, active: screenView === 'Feed Two' }"
          @click="handleNavClick('Feed Two')"
        >
          Feed 2
        </div>
        <div
          :class="{ 'nav-option': true, active: screenView === 'Feed Three' }"
          @click="handleNavClick('Feed Three')"
        >
          Feed 3
        </div>
      </div>
    </div>

    <component :is="currentScreenComponent"></component>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PostsOne from './components/PostsOne.vue';
import PostsTwo from './components/PostsTwo.vue';
import PostsThree from './components/PostsThree.vue';

const screenView = ref('Feed One');

const handleNavClick = (screenName: string) => {
  screenView.value = screenName;
};

const currentScreenComponent = computed(() => {
  switch (screenView.value) {
    case 'Feed One':
      return PostsOne;
    case 'Feed Two':
      return PostsTwo;
    case 'Feed Three':
      return PostsThree;
    default:
      return null;
  }
});
</script>

<style scoped></style>
