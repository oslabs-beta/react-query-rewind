import React, { useEffect, useRef, useState } from 'react';
import Subscription from './Subscription';
import TimeTravel from './TimeTravel';

function ReactQueryRewind() {
  const [timeTravel, setTimeTravel] = useState(false);
  const contentConnectedRef = useRef(false);
  const contentMessageQueueRef = useRef<any[]>([]);

  const sendContentMessageQueue = () => {
    contentMessageQueueRef.current.forEach(sendEvent);
    contentMessageQueueRef.current = [];
  };

  const handleMessages = (message: any) => {
    if (contentConnectedRef.current) {
      sendEvent(message);
    } else {
      contentMessageQueueRef.current.push(message);
    }
  };

  const sendEvent = (event: any) => {
    window.postMessage(
      { framework: 'react', type: 'event', payload: event },
      '*'
    );
  };

  const handleContentMessages = (message: MessageEvent) => {
    if (message.data?.type === 'content-script-ready') {
      // console.log('APP: Content.ts connected');
      contentConnectedRef.current = true;
      window.postMessage({ type: 'app-connected' }, '*');
      sendContentMessageQueue();
    }

    if (message.data?.type === 'time-travel') {
      setTimeTravel(message.data.payload);
    }
  };

  useEffect(() => {
    // console.log('APP: Mounting Event Listeners');
    window.addEventListener('message', handleContentMessages);

    return () => {
      window.removeEventListener('message', handleContentMessages);
    };
  }, []);

  useEffect(() => {
    // console.log('timeTravel', timeTravel);
  }, [timeTravel]);

  return (
    <div>
      {timeTravel ? (
        <TimeTravel />
      ) : (
        <Subscription handleMessages={handleMessages} />
      )}
    </div>
  );
}

export default ReactQueryRewind;
