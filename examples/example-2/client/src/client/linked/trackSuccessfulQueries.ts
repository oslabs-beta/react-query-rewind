// function sends successful query metrics to chrome dev tool

import { QueryKey } from '@tanstack/react-query';

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

export default trackSuccessfulQueries;
