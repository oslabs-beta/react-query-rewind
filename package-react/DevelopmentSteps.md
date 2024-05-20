# React Query Rewind
See https://github.com/oslabs-beta/react-query-rewind/blob/main/README.md for a complete overview.

This document details setting up the package and examples for a testing environment.

## Production Installation and Set-Up
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

## Set-Up Example in the Example folder
**From the package-react directory:**
Execute `package-setup-1` to run:
1. `npm i`
    1. Installs all dependencies for the package
1. `npm run install-example`
    1. Installs all dependencies for the example app
2. `npm run link-dependencies`
    1. Installs all peer dependencies in our package to ensure there are no duplicates
    2. Can see all packages currently linked with *`npm ls -g --depth=0 --link=tr`*    
3. `npm run watch`
    1. Starts rollup in watch mode and creates dist folder
In a new shell (still in the package-react directory), execute `package-setup-2` to run:
1. `npm run link-package`
    1. Links React Query Rewind
2. `npm run example`
    1. Starts the example server with webpack. Note: this is a hot reload, but it does not always pick up changes to the npm package

## Set-up examples from Tanstack
**All packages located in _package-react/react-examples-tanstack_ folder**
_The below commands must be run from the package-react directory
- If an example has not been set up, ensure it has npm commands and the vite/webpack config resolves react and react-dom to ensure we look at the correct version of react.

### basic-typescript
- Execute `package-setup-1-basic-typescript`
- Execute `package-setup-2-basic-typescript`

### algolia
- Execute `package-setup-1-algolia`
- Execute `package-setup-2-algolia`



# Publishing
1. `npm login` to login to the npm site. Follow the instructions to publish your npm package
2. `npm publish`

# Development
Contributions are always welcome. Please create a fork from https://github.com/oslabs-beta/react-query-rewind.


### Future Development Needs
- Rollup currently does not build on older macs or on Linux (we have not confirmed the issue on Windows yet)
- Some developers on older macs need to install @rollup/rollup-darwin-x64 to get the build working
- Github actions uses linux and as a result, our test.yml script installs @rollup/rollup-darwin-x64 to ensure the build works properly
- Future development should ensure that builds work correclty regardless of the developer's machine and remove the installation of @rollup/rollup-darwin-x64 from the tests.yml file