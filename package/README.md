# React Query Rewind
Add an overview here

## Installation and Set-Up
Install the pacakage with: 
  `npm i -D react-query-rewind`

Import the ReactQueryRewind component and place it as close as possible to the root of your app.

Download the chrome extension from ***insert url here*** in order to time travel state in a developer toosl panel within your chrome browser.

## Example 

```javascript
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App';
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

  const queryClient = new QueryClient();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <ReactQueryRewind/>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
```

# Development
Contributions are always welcome. Please create a fork from https://github.com/oslabs-beta/react-query-rewind. To get started with the example apps:

## Set-Up Examples
**From the root directory:**
Run with "1" or "2" depending on which example you'd like to set up
1. `npm run install-all`
2. `npm run link-dependencies-1` or `npm run link-dependencies-2`
    1. Installs all peer dependencies in our package to ensure there are no duplicates
    2. Can see all packages currently linked with *`npm ls -g --depth=0 --link=tr`*    
3. `npm run watch`
    1. Starts rollup in watch mode and creates dist folder
4. `npm run link-package-1` *or* `npm run link-package-2`
    1. Links React Query Rewind
5. `npm run example-1` *or* `npm run example-2`
    1. Starts the example server with webpack. Note: this is a hot reload, but it does not always pick up changes to the npm package

# Publishing
1. `npm login` to login to the npm site. Follow the instructions to publish your npm package
2. `npm publish`

### Future Development
- Rollup currently does not build on older macs or on Linux (we have not confirmed the issue on Windows yet)
- Some developers on older macs need to install @rollup/rollup-darwin-x64 to get the build working
- Github actions uses linux and as a result, our test.yml script installs @rollup/rollup-darwin-x64 to ensure the build works properly
- Future development should ensure that builds work correclty regardless of the developer's machine and remove the installation of @rollup/rollup-darwin-x64 from the tests.yml file