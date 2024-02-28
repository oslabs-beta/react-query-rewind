import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { formatData } from './formatData';

type SubscriptionProps = {
  contentConnectedRef: React.RefObject<boolean>;
};

function Subscription({ contentConnectedRef }: SubscriptionProps) {
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();
  const [contentMessageQueue, setContentMessageQueue] = useState<any[]>([]);

  const sendEvent = (data: any) => {
    window.postMessage(
      {
        framework: 'react',
        type: 'event',
        payload: data,
      },
      '*'
    );
  };

  const handleQueryCacheChange = async (event: any) => {
    const message = formatData(event, queryClient);
    // console.log('Sub: message:', message);
    // console.log('Sub: contentConnected', contentConnected);
    if (!message) return;
    if (!contentConnectedRef) {
      setContentMessageQueue(prevQueue => [...prevQueue, message]);
    } else {
      console.log(message);
      sendEvent(message);
    }
  };

  useEffect(() => {
    if (contentConnectedRef) {
      contentMessageQueue.forEach(sendEvent);
      setContentMessageQueue([]);
    }
  }, [contentConnectedRef]);

  useEffect(() => {
    console.log('Sub: contentConnectedRef', contentConnectedRef);
  }, [contentConnectedRef]);

  useEffect(() => {
    // console.log('SUB MOUNTING');
    const unsubscribe = queryCache.subscribe(handleQueryCacheChange);
    return () => unsubscribe();
  }, []);

  return <div>Subscription Component</div>;
}

export default Subscription;
