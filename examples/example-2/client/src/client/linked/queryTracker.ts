import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import trackSuccessfulQueries from './trackSuccessfulQueries';
import trackFailedQueries from './trackFailedQueries';

const queryTracker = async ({ queryKey, meta }: QueryFunctionContext) => {
  const url = meta?.url as string;

  if (!url) {
    throw new Error(`URL not provided for query key: ${queryKey}`);
  }

  const timestamp = new Date().toISOString();

  try {
    const startTime = performance.now();

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Query-Key': JSON.stringify(queryKey),
      },
    });

    const endTime = performance.now();

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const executionTime = endTime - startTime;
    trackSuccessfulQueries(JSON.stringify(queryKey), timestamp, executionTime);

    const fetchedData = await response.json();

    return fetchedData;
  } catch (error) {
    const errorTime = new Date().toISOString();
    trackFailedQueries(JSON.stringify(queryKey), timestamp);
    throw error;
  }
};

export default queryTracker;
