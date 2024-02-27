import React, { useEffect, useState } from 'react';
import Subscription from './Subscription';
import TimeTravel from './TimeTravel';

function ReactQueryRewind() {
  const [timeTravel, setTimeTravel] = useState(false);
  const [contentConnected, setContentConnected] = useState(false);

  const handleContentMessages = (message: MessageEvent) => {
    if (message.data?.type === 'content-script-ready') {
      console.log('APP: Connected to content.ts');
      setContentConnected(true);
      window.postMessage({ type: 'app-connected' }, '*');
    }

    if (message.data?.type === 'time-travel') {
      setTimeTravel(message.data.detail);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleContentMessages);

    return () => {
      window.removeEventListener('message', handleContentMessages);
    };
  }, []);

  return (
    <div>
      {timeTravel ? (
        <TimeTravel />
      ) : (
        <Subscription contentConnected={contentConnected} />
      )}
    </div>
  );
}

export default ReactQueryRewind;
