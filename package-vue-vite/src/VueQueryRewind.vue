<!-- src/VueQueryRewind.vue -->
<template>
  <div>Vue Query Rewind Component</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'VueQueryRewind',
  setup() {
    onMounted(() => {
      console.log('Hello World');
    });
  },
});
</script>

<style scoped>
/* Add any styles for your component here */
</style>
