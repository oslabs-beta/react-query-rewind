import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './styles.css';

import ReactQueryRewind from 'react-query-rewind';
// import ReactQueryRewind from './link';
// import ReactQueryRewind from '../../../src/index';

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Layout from './components/Layout';
import Finance from './components/Finance';
import Sports from './components/Sports';
import Technology from './components/Technology';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * (60 * 1000), // 5 mins
      gcTime: 10 * (60 * 1000), // 10 mins
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // replace '/' with '/technology-discussion' on load
      {
        index: true,
        element: <Navigate to="/technology-discussion" replace />,
      },
      { path: 'technology-discussion', element: <Technology /> },
      { path: 'finance-discussion', element: <Finance /> },
      { path: 'sports-discussion', element: <Sports /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryRewind />
  </QueryClientProvider>
);
