import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

let currentQueryKey: QueryKey | undefined = undefined;
let failedQueries = 0;

const trackSuccessfulQueries = (
  queryKey: QueryKey,
  sucessTime: string,
  executionTime: number
) => {
  window.postMessage(
    {
      type: 'react-query-rewind',
      payload: {
        type: 'metric',
        metric: {
          type: 'successful query',
          data: { queryKey, sucessTime, executionTime },
        },
      },
    },
    '*'
  );
};

const trackFailedQueries = (queryKey: QueryKey, errorTime: string) => {
  if (JSON.stringify(queryKey) !== JSON.stringify(currentQueryKey)) {
    currentQueryKey = queryKey;
    failedQueries = 0;
  }

  if (failedQueries === 0) {
    // send failed query metric to chrome dev tool
    window.postMessage(
      {
        type: 'react-query-rewind',
        payload: {
          type: 'metric',
          metric: { type: 'failded query', data: { queryKey, errorTime } },
        },
      },
      '*'
    );
  }

  if (failedQueries > 0) {
    // send retry query metric to the database
    window.postMessage(
      {
        type: 'react-query-rewind',
        payload: {
          type: 'metric',
          metric: { type: 'retry query', data: { queryKey, errorTime } },
        },
      },
      '*'
    );
  }

  failedQueries++;
};

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

    // send successful query metrics to chrome dev tool
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    const sucessTime = new Date().toISOString();
    trackSuccessfulQueries(queryKey, sucessTime, executionTime);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const fetchedData = await response.json();

    return fetchedData;
  } catch (error) {
    const errorTime = new Date().toISOString();
    // send failed query metrics to chrome dev tool
    trackFailedQueries(queryKey, errorTime);
    throw error;
  }
};

export default queryTracker;
