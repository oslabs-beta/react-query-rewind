import React, { useEffect, useState } from 'react';
import Subscription from './Subscription';
import TimeTravel from './TimeTravel';

const ReactQueryRewind: React.FC = () => {
  const [timeTravel, setTimeTravel] = useState<boolean>(false);

  useEffect(() => {
    const listener = function (event: CustomEvent) {
      setTimeTravel(event.detail.timeTravel);
    };
    window.addEventListener('TimeTravel', listener);
    return () => window.removeEventListener('TimeTravel', listener);
  }, []);

  return timeTravel ? <TimeTravel /> : <Subscription />;
};

export default ReactQueryRewind;
