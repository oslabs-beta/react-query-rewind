import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './styles.css';

// import ReactQueryRewind from 'react-query-rewind';
import ReactQueryRewind from './link';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import PostsOne from './components/PostsOne';
import Test from './components/Test';

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
    // errorElement: <ErrorPage />,
    children: [
      {
        path: 'contacts/:contactId',
        element: <Test />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />

    {/* <App /> */}
    <ReactQueryRewind />
  </QueryClientProvider>
);
