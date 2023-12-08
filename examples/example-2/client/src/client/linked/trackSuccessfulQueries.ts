// function sends successful query metrics to chrome dev tool

import { QueryKey } from '@tanstack/react-query';

const trackSuccessfulQueries = (
  queryKey: string,
  timestamp: string,
  executionTime: number
) => {
  window.postMessage(
    {
      type: 'react-query-rewind',
      payload: {
        type: 'metric',
        metric: {
          type: 'successful',
          data: { queryKey, timestamp, executionTime },
        },
      },
    },
    '*'
  );
};

export default trackSuccessfulQueries;
