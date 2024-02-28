import React, { useEffect, useRef, useState } from 'react';
import Subscription from './Subscription';
import TimeTravel from './TimeTravel';
import sendEvent from './sendEvent';

function ReactQueryRewind() {
  const [timeTravel, setTimeTravel] = useState(false);
  // const [contentConnected, setContentConnected] = useState(false);
  const contentConnectedRef = useRef(false); // Use useRef here

  // const [contentMessageQueue, setContentMessageQueue] = useState<any[]>([]);
  const contentMessageQueueRef = useRef<any[]>([]);

  const sendContentMessageQueue = () => {
    console.log('SENDING MESSAGES');
    // console.log('SEND_QUEUE:', contentMessageQueue);
    contentMessageQueueRef.current.forEach(sendEvent);
    contentMessageQueueRef.current = [];
  };

  const addMessageToQueue = (message: any) => {
    console.log(message);
    // console.log('ADD_TO_QUEUE', contentMessageQueue);
    contentMessageQueueRef.current.push(message); // Add the message directly to the ref
  };

  const handleContentMessages = (message: MessageEvent) => {
    if (message.data?.type === 'content-script-ready') {
      // console.log('APP: Connected to content.ts');
      // setContentConnected(true);
      contentConnectedRef.current = true; // Directly update ref
      window.postMessage({ type: 'app-connected' }, '*');
      sendContentMessageQueue();
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
  //   console.log(contentMessageQueue);
  // }, [contentMessageQueue]);

  // useEffect(() => {
  //   console.log('Index: contentConnected', contentConnected);
  // }, [contentConnected]);

  return (
    <div>
      {timeTravel ? (
        <TimeTravel />
      ) : (
        <Subscription
          contentConnectedRef={contentConnectedRef}
          addMessageToQueue={addMessageToQueue}
        />
      )}
    </div>
  );
}

export default ReactQueryRewind;
