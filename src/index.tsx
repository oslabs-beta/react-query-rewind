import React, { useEffect, useState } from 'react';
import Subscription from './Subscription';
import TimeTravel from './TimeTravel';
import ErrorBoundary from './ErrorBoundary';

const ReactQueryRewind = () => {
  const [timeTravel, setTimeTravel] = useState<boolean>(false);

  useEffect(() => {
    const listener = function (event: CustomEvent) {
      setTimeTravel(event.detail.timeTravel);
    };
    window.addEventListener('TimeTravel', listener);
    return () => window.removeEventListener('TimeTravel', listener);
  }, []);

  return (
    <ErrorBoundary>
      {timeTravel ? <TimeTravel /> : <Subscription />}
    </ErrorBoundary>
  )
};

export default ReactQueryRewind;
