import { QueryFunctionContext } from '@tanstack/react-query';

const queryTracker = async ({ queryKey }: QueryFunctionContext) => {
  const [queryKeyName, url] = queryKey as [string, string];

  const headers = {
    'Query-Key': queryKeyName,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export default queryTracker;
