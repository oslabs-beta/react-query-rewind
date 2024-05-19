import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import type { VueQueryPluginOptions } from '@tanstack/vue-query';
import VueQueryRewind from '@react-query-rewind/vue-query-rewind';

import App from './App.vue';

const vueQueryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24,
        // staleTime: 1000 * 10,
      },
    },
  },
};

// createApp(App).use(VueQueryPlugin, vueQueryOptions).mount('#app');

const app = createApp(App);

app.use(VueQueryPlugin);
app.use(VueQueryRewind);

app.mount('#app');
