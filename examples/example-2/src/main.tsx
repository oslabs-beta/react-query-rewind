// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient } from '@tanstack/react-query';
import './styles.css';

// import ReactQueryRewind from '../../../src/index.tsx';

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
    {/* <ReactQueryRewind /> */}
  </QueryClientProvider>
  // </React.StrictMode>
);
