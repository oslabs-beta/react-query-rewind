import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

let currentQueryKey: string | undefined = undefined;
let failedQueries = 0;

const trackFailedQueries = (queryKey: string, timestamp: string) => {
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
          metric: { type: 'failded', data: { queryKey, timestamp } },
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
          metric: { type: 'retry', data: { queryKey, timestamp } },
        },
      },
      '*'
    );
  }

  failedQueries++;
};

export default trackFailedQueries;
