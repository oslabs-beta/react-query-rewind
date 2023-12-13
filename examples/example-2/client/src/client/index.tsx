import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient } from '@tanstack/react-query';
import './styles.css';

import ReactQueryRewind from 'react-query-rewind';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * (60 * 1000), // 5 mins
      gcTime: 10 * (60 * 1000), // 10 mins
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
    {/* <ReactQueryDevtools /> */}
    <ReactQueryRewind />
  </QueryClientProvider>
  // </React.StrictMode>
);
