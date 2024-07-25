import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

// Fallback component to display when an error is caught
const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  console.error('ERROR IN REACT QUERY REWIND: ', error);
  console.log(`%c Ensure the ReactQueryRewind component is inside query client. If the issue persists, please disable React Query Rewind and submit an issue on Github: https://github.com/oslabs-beta/react-query-rewind`, 'color: red; background-color: lightyellow; font-weight: bold; padding: 2px;');
  return (
    <></>
  );
};

// ErrorBoundary component wrapping the ErrorFallback
const CustomErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
