// entry point that exports the useReactQueryRewind hook
import React from 'react';
import { useEffect } from 'react';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { SubscribeEvent } from './types';
// import formatAndSendToChrome from './lib/rewind'

// DATA TO SEND
//

const logging = (event: SubscribeEvent) => {
  const simplifiedObj = {
    type: event.type,
    time: event.query.state.dataUpdatedAt,
    queryKey: event.query.queryKey,
    func: event.query.options.queryFn,
    data: event.query.state.data,
    status: event.query.state.status,
    fetchStatus: event.query.state.fetchStatus,
    action: event.action ? event.action.type : null,
  };

  const importantTypes = ['updated', 'removed', 'added'];
  if (importantTypes.includes(simplifiedObj.type)) {
    console.log(event);
  }
};

const ReactQueryRewind = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const queryCache = queryClient.getQueryCache();

    const unsubscribe = queryCache.subscribe((event: SubscribeEvent) => {
      logging(event);
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default ReactQueryRewind;
