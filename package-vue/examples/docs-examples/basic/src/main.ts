import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import VueQueryRewind from '@react-query-rewind/vue-query-rewind';

import App from './App.vue';

const app = createApp(App);

app.use(VueQueryPlugin);
app.use(VueQueryRewind);

app.mount('#app');
