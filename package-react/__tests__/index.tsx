import React from 'react';
import ReactQueryRewind from '../src/index'
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {describe, it} from '@jest/globals'

describe('Renders when a query client is provided', () => {
  // mock query client
  const queryClient = new QueryClient();

  it('renders without crashing when wrapped around a query client', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ReactQueryRewind/>
      </QueryClientProvider>
    );
  });
});

describe('Errors gracefully when a query client is not provided', () => {

  it('renders without crashing without a query client provider', () => {
    render(
      <ReactQueryRewind/>
    );
  });
});