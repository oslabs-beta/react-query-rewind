import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// I think we need to update package.json for this
import ReactQueryRewind from 'react-query-rewind';

import TestReactQueryRewind from './components/TestReactQueryRewind'

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
    {/* <TestReactQueryRewind/> */}
    <ReactQueryRewind/>
    <App />
    <ReactQueryDevtools />
  </QueryClientProvider>
  // </React.StrictMode>
);
