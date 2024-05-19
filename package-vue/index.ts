import { App } from 'vue';
import VueQueryRewind from './src/VueQueryRewind.vue';

// Create an install function for the plugin
const install = (app: App): void => {
  app.component('VueQueryRewind', VueQueryRewind);
};

// Export the component and the install function as default
export { VueQueryRewind };

export default {
  install,
};
