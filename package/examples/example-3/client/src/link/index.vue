<template>
  <TimeTravel v-if="timeTravel" />
  <Subscription v-else />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Subscription from './Subscription.vue';
import TimeTravel from './TimeTravel.vue';

const timeTravel = ref(false);

onMounted(() => {
  const toggleTimeTravel = function (event: any) {
    timeTravel.value = event.detail;
  };

  window.addEventListener('time-travel', toggleTimeTravel);

  const sendAppConnectedMessage = async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    window.postMessage({ type: 'app-connected' }, '*');
  };

  sendAppConnectedMessage();

  onBeforeUnmount(() => {
    window.removeEventListener('time-travel', toggleTimeTravel);
  });
});
</script>

<script lang="ts">
export default {
  name: 'VueQueryRewind',
};
</script>

<style scoped></style>
