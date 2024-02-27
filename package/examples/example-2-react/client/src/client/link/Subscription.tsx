import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { formatData } from './formatData';

type SubscriptionProps = {
  contentConnected: boolean;
};

function Subscription({ contentConnected }: SubscriptionProps) {
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
    const message = await formatData(event, queryClient);
    if (!message) return;
    if (!contentConnected) {
      setContentMessageQueue(prevQueue => [...prevQueue, message]);
    } else {
      sendEvent(message);
    }
  };

  useEffect(() => {
    if (contentConnected) {
      contentMessageQueue.forEach(sendEvent);
      setContentMessageQueue([]);
    }
  }, [contentConnected, contentMessageQueue]);

  useEffect(() => {
    const unsubscribe = queryCache.subscribe(handleQueryCacheChange);
    return () => unsubscribe();
  }, []);

  return <div>Subscription Component</div>;
}

export default Subscription;
