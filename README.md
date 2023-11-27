# React Query Rewind
Add an overview here

## Installation and Set-Up
  npm i -D react-query-rewind


# Example 
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App';
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <ReactQueryRewind/>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );

# Development
## Testing with Example 1

Contributions are always welcome

**From the root directory:**
1. `npm run install-all`
2. `npm run link-dependencies`
    1. Installs all peer dependencies in our package to ensure there are no duplicates
    2. Can see all packages currently linked with *`npm ls -g --depth=0 --link=tr`*    
3. `npm run watch`
    1. Starts rollup in watch mode and creates dist folder
4. `npm run link-package`
    1. Links React Query Rewind
5. `npm run example-1`
    1. Starts the example server with webpack