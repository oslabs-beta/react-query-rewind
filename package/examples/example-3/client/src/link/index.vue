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

const handleContentMessages = (message: any) => {
  if (message.data?.type === 'content-script-ready') {
    console.log('APP: Connected to content.ts');
    contentConnected.value = true;
    window.postMessage({ type: 'app-connected' }, '*');
  }

  if (message.data?.type === 'time-travel') {
    timeTravel.value = message.detail;
  }
};

onMounted(() => {
  window.addEventListener('message', handleContentMessages);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handleContentMessages);
});
</script>

<script lang="ts">
export default {
  name: 'VueQueryRewind',
};
</script>

<style scoped></style>
