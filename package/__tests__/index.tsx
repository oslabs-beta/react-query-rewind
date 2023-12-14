import React from 'react';
import ReactQueryRewind from '../src/index'
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {describe, it} from '@jest/globals'

describe('Renders when a query client is provided', () => {
  // mock query client
  const queryClient = new QueryClient();

  // we **might** want to add clean error handling for developers to ensure the component fails gracefully
  // This fails if I don't create a query client and wrap ReactQueryRewind around a QueryClientProvider component and the same thing would happen in production

  it('renders without crashing when wrapped around a query client', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ReactQueryRewind/>
      </QueryClientProvider>
    );
  });
});