<template>
  <div>
    <Subscription v-if="!timeTravel" />
    <TimeTravel v-else />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Subscription from './Subscription.vue';
import TimeTravel from './TimeTravel.vue';

export default {
  name: 'VueQueryRewind',
  components: {
    Subscription,
    TimeTravel,
  },
  setup() {
    const timeTravel = ref(false);

    const listener = event => {
      timeTravel.value = event.detail.timeTravel;
    };

    onMounted(() => {
      window.addEventListener('TimeTravel', listener);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('TimeTravel', listener);
    });

    return { timeTravel };
  },
};
</script>
