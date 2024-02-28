import React, { useEffect, useRef, useState } from 'react';
import Subscription from './Subscription';
import TimeTravel from './TimeTravel';

function ReactQueryRewind() {
  const [timeTravel, setTimeTravel] = useState(false);
  // const [contentConnected, setContentConnected] = useState(false);
  const contentConnectedRef = useRef(false); // Use useRef here

  const handleContentMessages = (message: MessageEvent) => {
    if (message.data?.type === 'content-script-ready') {
      // console.log('APP: Connected to content.ts');
      // setContentConnected(true);
      contentConnectedRef.current = true; // Directly update ref

      window.postMessage({ type: 'app-connected' }, '*');
    }

    if (message.data?.type === 'time-travel') {
      setTimeTravel(message.data.detail);
    }
  };

  useEffect(() => {
    // console.log('RERENDERING');

    window.addEventListener('message', handleContentMessages);

    return () => {
      window.removeEventListener('message', handleContentMessages);
    };
  }, []);

  // useEffect(() => {
  //   console.log('Index: contentConnected', contentConnected);
  // }, [contentConnected]);

  return (
    <div>
      {timeTravel ? (
        <TimeTravel />
      ) : (
        <Subscription contentConnectedRef={contentConnectedRef} />
      )}
    </div>
  );
}

export default ReactQueryRewind;
