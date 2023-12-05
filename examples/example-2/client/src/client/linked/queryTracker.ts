import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

const queryTracker = async ({
  queryKey,
  meta,
}: QueryFunctionContext<QueryKey>) => {
  const url = meta?.url as string;

  if (!url) {
    throw new Error(`URL not provided for query key: ${queryKey}`);
  }

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Query-Key': JSON.stringify(queryKey),
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export default queryTracker;
