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
import { ref, computed } from 'vue';
import PostsOne from './components/PostsOne.vue';
import PostsTwo from './components/PostsTwo.vue';
import PostsThree from './components/PostsThree.vue';

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
</script>

<style scoped>
.window {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  background-color: #f0f0f0;
  overflow-y: auto;
}

.nav-bar {
  height: 6rem;
  width: 100%;
  background-color: #007bff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.2);
}

.title {
  font-weight: bold;
  font-size: 2rem;
  color: white;
  margin-left: 2rem;
}

.nav-options {
  display: flex;
}

.nav-option {
  font-weight: bold;
  font-size: 1.5rem;
  color: white;
  margin-right: 2rem;
  cursor: pointer;
}

.nav-option:hover {
  text-decoration: underline;
  text-decoration-thickness: 0.22rem;
  text-underline-offset: 0.3rem;
}

.nav-option.active {
  text-decoration: underline;
  text-decoration-thickness: 0.22rem;
  text-underline-offset: 0.3rem;
}
</style>
