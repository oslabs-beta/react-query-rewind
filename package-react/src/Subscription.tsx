import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { formatData } from './formatData';

type SubscriptionProps = {
  handleMessages: any;
};

function Subscription({ handleMessages }: SubscriptionProps) {
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();

  const handleQueryCacheChange = async (event: any) => {
    const message = formatData(event, queryClient);
    // console.log('message', message);
    if (message) handleMessages(message);
  };

  useEffect(() => {
    const unsubscribe = queryCache.subscribe(handleQueryCacheChange);
    return () => unsubscribe();
  }, []);

  return <></>;
}

export default Subscription;
