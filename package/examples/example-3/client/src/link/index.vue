<template>
  <TimeTravel v-if="timeTravel" />
  <Subscription v-else :content-connected="contentConnected" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Subscription from './Subscription.vue';
import TimeTravel from './TimeTravel.vue';

const timeTravel = ref(false);
const contentConnected = ref(false);

const handleContentScriptReady = (event: any) => {
  if (event.data?.type === 'content-script-ready') {
    contentConnected.value = true;
    console.log(contentConnected);
    window.postMessage({ type: 'app-connected' }, '*');
  }
};

const toggleTimeTravel = function (event: any) {
  timeTravel.value = event.detail;
};

onMounted(() => {
  window.addEventListener('content-script-ready', handleContentScriptReady);
  window.addEventListener('time-travel', toggleTimeTravel);
});

onBeforeUnmount(() => {
  window.removeEventListener('content-script-ready', handleContentScriptReady);
  window.removeEventListener('time-travel', toggleTimeTravel);
});
</script>

<script lang="ts">
export default {
  name: 'VueQueryRewind',
};
</script>

<style scoped></style>
