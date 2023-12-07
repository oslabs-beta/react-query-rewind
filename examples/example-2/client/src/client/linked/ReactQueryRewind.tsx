import React, { useEffect } from 'react';
import { useQueryClient, QueryCacheNotifyEvent } from '@tanstack/react-query';
import formatData from './formatData';

const ReactQueryRewind = () => {
  const queryClient = useQueryClient();

  // when component mounts add event listener to query cache to track changes
  useEffect(() => {
    const queryCache = queryClient.getQueryCache();

    const unsubscribe = queryCache.subscribe((event: QueryCacheNotifyEvent) => {
      const data = formatData(event, queryClient);

      if (data) {
        // place function that sends data to chrome extension
        // queryClient.setQueryData(['test-data'], data);
        window.postMessage(
          {
            type: 'react-query-rewind',
            payload: { type: 'event', event: data },
          },
          '*'
        );
      }
    });

    // remove event listener on component dismount
    return () => unsubscribe();
  }, []);
  return <></>;
};

export default ReactQueryRewind;
