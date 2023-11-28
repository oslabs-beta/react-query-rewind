import React, { useEffect } from 'react';
import {
  useQueryClient,
  QueryCacheNotifyEvent,
  QueryClient,
} from '@tanstack/react-query';

// format data before sending to chrome extension
const formatData = (event: QueryCacheNotifyEvent, queryClient: QueryClient) => {
  const eventType = event.type;
  const queryKey = event.query.queryKey;
  const queryHash = event.query.queryHash;
  const timestamp = new Date(event.query.state.dataUpdatedAt);

  if (queryHash === '["test-data"]') return;

  if (event.type === 'updated' && event.action?.type === 'success') {
    // handle updated events with success action type
    const queryData = queryClient.getQueryData(event.query.queryKey);

    return {
      eventType,
      queryKey,
      queryHash,
      timestamp,
      queryData,
    };
  }

  // handle removed events to clear query cache
  if (event.type === 'removed') {
    return {
      eventType,
      queryKey,
      queryHash,
      timestamp,
    };
  }

  return null;
};

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
            payload: data,
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
