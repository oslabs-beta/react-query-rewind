import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

const MAX_RETRY_ATTEMPTS = 3;

const queryRetry = (
  failureCount: number,
  error: Error,
  context?: QueryFunctionContext<QueryKey>
) => {
  if (context) {
    console.log(error);
  }

  // Optional: You can log or use the queryKey from context if needed
  console.log('context', context);

  if (context) {
    console.log('Query Key:', context.queryKey);
  }

  console.log('Retries', failureCount + 1); // +1 because failureCount starts at 0
  console.log('Max Retries', MAX_RETRY_ATTEMPTS);
  console.log(error);

  return failureCount < MAX_RETRY_ATTEMPTS - 1;
};

export default queryRetry;
