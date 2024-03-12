import {
  QueryCacheNotifyEvent,
  QueryClient,
  QueryKey,
} from '@tanstack/react-query';

export function formatData(
  event: QueryCacheNotifyEvent,
  queryClient: QueryClient
) {
  const eventType = event.type;
  const queryKey: QueryKey = event.query.queryKey;
  const queryHash = event.query.queryHash;
  const timestamp = new Date(event.query.state.dataUpdatedAt);

  if (queryHash === '["test-data"]') return;

  if (eventType === 'updated' && event.action?.type === 'success') {
    const queryData = queryClient.getQueryData(queryKey);
    return {
      eventType,
      queryKey,
      queryHash,
      timestamp,
      queryData,
    };
  }

  if (eventType === 'removed') {
    return {
      eventType,
      queryKey,
      queryHash,
      timestamp,
    };
  }

  return null;
}
