import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import trackSuccessfulQueries from './trackSuccessfulQueries';
import trackFailedQueries from './trackFailedQueries';

const queryTracker = async ({ queryKey, meta }: QueryFunctionContext) => {
  const url = meta?.url as string;

  if (!url) {
    throw new Error(`URL not provided for query key: ${queryKey}`);
  }

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
    const sucessTime = new Date().toISOString();
    trackSuccessfulQueries(queryKey, sucessTime, executionTime);

    const fetchedData = await response.json();

    return fetchedData;
  } catch (error) {
    const errorTime = new Date().toISOString();
    trackFailedQueries(queryKey, errorTime);
    throw error;
  }
};

export default queryTracker;
