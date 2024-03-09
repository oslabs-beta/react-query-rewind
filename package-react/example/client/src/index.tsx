import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './styles.css';

// import ReactQueryRewind from 'react-query-rewind';
import ReactQueryRewind from './link';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Layout from './components/Layout';
import FeedOne from './components/FeedOne';
import Feed from './components/Feed';

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
      // replace '/' with '/feed-one' on load
      { index: true, element: <Navigate to="/feed-one" replace /> },
      { path: 'feed-one', element: <Feed /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryRewind />
  </QueryClientProvider>
);
