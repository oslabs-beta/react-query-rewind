import { QueryFunctionContext } from '@tanstack/react-query';

let querySuccessCount = 0;
let queryFailureCount = 0;

const queryTracker = async ({ queryKey, meta }: QueryFunctionContext) => {
  const url = meta?.url as string;

  if (!url) {
    throw new Error(`URL not provided for query key: ${queryKey}`);
  }

  try {
    // record query start time
    const startTime = performance.now();

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Query-Key': JSON.stringify(queryKey),
      },
    });

    // record query end time and total execution time in milliseconds
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    console.log('failed again');

    if (!response.ok) {
      queryFailureCount++;
      throw new Error('Network response was not ok');
    }

    console.log(executionTime);

    querySuccessCount++;

    console.log(querySuccessCount, queryFailureCount);

    return response.json();
  } catch (error) {
    queryFailureCount++;

    throw error;
  }
};

export default queryTracker;
