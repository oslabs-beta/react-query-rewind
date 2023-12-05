import { QueryCacheNotifyEvent, QueryClient } from '@tanstack/react-query';

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

export default formatData;
