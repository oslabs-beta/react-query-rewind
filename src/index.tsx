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

  // handle updated events with success action type
  if (event.type === 'updated' && event.action?.type === 'success') {
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
        // send data to chrome extension
        try {
          // postMessage takes in:
          // message - can be object with any fields
          // target (just saying all for now)
          // other options
          window.postMessage(
            {
              type: 'react-query-rewind',
              payload: data,
            },
            '*'
          ); // use * for all - not sure if this is secure
        } catch (e) {
          console.error(e);
        }

        localStorage.setItem('test', JSON.stringify(data));
      }
    });

    // remove event listener on component dismount
    return () => unsubscribe();
  }, []);
  return <></>;
};

export default ReactQueryRewind;
