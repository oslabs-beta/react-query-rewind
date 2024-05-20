import { App } from 'vue';
import VueQueryRewind from './VueQueryRewind.vue';

const install = (app: App): void => {
  app.component('VueQueryRewind', VueQueryRewind);
};

export { install, VueQueryRewind };
