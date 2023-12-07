import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient } from '@tanstack/react-query';
import './styles.css';

import ReactQueryRewind from './linked/ReactQueryRewind';
import queryTracker from './linked/queryTracker';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: queryTracker,
      staleTime: 10000,
      // gcTime: 10,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
    <ReactQueryRewind />
  </QueryClientProvider>
  // </React.StrictMode>
);
