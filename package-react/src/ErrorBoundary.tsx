import React from 'react';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';

// Fallback component to display when an error is caught
const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  console.error('ERROR IN REACT QUERY REWIND: ', error);
  return (
    <></>
  );
};

// ErrorBoundary component wrapping the ErrorFallback
const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
