import { createApp } from 'vue';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import App from './App.vue';
import './styles.css';
import VueQueryRewind from '@react-query-rewind/vue-query-rewind';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 mins
      gcTime: 10 * 60 * 1000, // 10 mins
    },
  },
});

// creating a new Vue app instance with app as the root component
const app = createApp(App);

// installing the vue query plugin into the app
app.use(VueQueryPlugin, { queryClient });

app.use(VueQueryRewind);

// mounts vue app to DOM with id app
app.mount('#app');
