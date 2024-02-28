import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { formatData } from './formatData';
import sendEvent from './sendEvent';

type SubscriptionProps = {
  contentConnectedRef: React.RefObject<boolean>;
  addMessageToQueue: any;
};

function Subscription({
  contentConnectedRef,
  addMessageToQueue,
}: SubscriptionProps) {
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();
  // const [contentMessageQueue, setContentMessageQueue] = useState<any[]>([]);

  const handleQueryCacheChange = async (event: any) => {
    // Formats query cache events into message to be sent to the content script
    const message = formatData(event, queryClient);
    // Query cache events not type 'update' are ignored
    if (!message) return;

    if (!contentConnectedRef.current) {
      console.log('que');
      console.log(contentConnectedRef.current);

      // setContentMessageQueue(prevQueue => [...prevQueue, message]);

      addMessageToQueue(message);
    } else {
      console.log('send');
      console.log(contentConnectedRef.current);
      sendEvent(message);
    }
  };

  // useEffect(() => {
  //   if (contentConnectedRef.current) {
  //     contentMessageQueue.forEach(sendEvent);
  //     setContentMessageQueue([]);
  //   }
  // }, [contentConnectedRef]);

  useEffect(() => {
    const unsubscribe = queryCache.subscribe(handleQueryCacheChange);
    return () => unsubscribe();
  }, []);

  return <div>Subscription Component</div>;
}

export default Subscription;
