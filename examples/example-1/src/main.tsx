import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Path once built:
// import ReactQueryRewind from '../../../dist/esm/index.js';

// Path for testing
import ReactQueryRewind from '../../../src/index.tsx'

// import ReactQueryRewind from './index.tsx'

// create queryClientProvider
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      gcTime: 3000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ReactQueryRewind/>
    <App />
    <ReactQueryDevtools />
  </QueryClientProvider>
  // </React.StrictMode>
);
