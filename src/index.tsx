// entry point that exports the useReactQueryRewind hook

import { useEffect } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { SubscribeEvent } from './types';

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
