import Vue from 'vue';
import VueCompositionApi, { createApp, h } from '@vue/composition-api';
import { VueQueryPlugin } from '@tanstack/vue-query';

import VueQueryRewind from '@react-query-rewind/vue-query-rewind';

import App from './App.vue';

Vue.use(VueCompositionApi);
Vue.use(VueQueryPlugin);

Vue.use(VueQueryRewind);

createApp({
  render() {
    return h(App);
  },
}).mount('#app');
