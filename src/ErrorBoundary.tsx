import React, { useEffect } from 'react';

// Resouces:
// https://builtin.com/software-engineering-perspectives/react-error-boundary
// https://blog.logrocket.com/react-error-handling-with-react-error-boundary/

type ErrorBoundaryState = {
  hasError: boolean;
};

type ErrorBoundaryProps = React.PropsWithChildren<{}>

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false };
  }

  // Catches exceptions generated in descendant components. Unhandled exceptions will cause the entire component tree to unmount.
  componentDidCatch(error, info) {
    // Send window message with error info
    useEffect(() => {
      window.postMessage(
        {
          type: 'react-query-rewind',
          payload: {
            eventType: null,
            queryKey: null,
            queryHash: null,
            timestamp: null,
            queryData: null,
            isError: true,
          },
        },
        '*'
      );
    },[])
    console.log('Error!');
  }

  render() {
    if (this.state.hasError) {
      return <></>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
