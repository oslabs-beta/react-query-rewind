// custom hook we will import into React Query to enable rewind functionality

import { useEffect } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { SubscribeEvent } from '../types/types';

export const useReactQueryRewind = (queryClient: QueryClient) => {
  useEffect(() => {
    const queryCache = queryClient.getQueryCache();

    const unsubscribe = queryCache.subscribe((event: SubscribeEvent) => {
      // logic to send to Chrome Extension
      console.log(event);
    });

    return () => unsubscribe();
  }, []);
};
