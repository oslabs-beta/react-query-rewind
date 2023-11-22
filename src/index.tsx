// entry point that exports the useReactQueryRewind hook
import React from 'react';
import { useEffect } from 'react';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { SubscribeEvent } from './types';
// import formatAndSendToChrome from './lib/rewind'

// Test function so we can see data in the console
const logging = (event: SubscribeEvent) => {
  // need to parse through this data and send it to the chrome extension
  
  const simplifiedObj = {
    type: event.type,
    time: event.query.state.dataUpdatedAt, //might need to format this as a datetime
    queryKey: event.query.queryKey,
    func: event.query.options.queryFn,
    data: event.query.state.data,
    status: event.query.state.status,
    fetchStatus: event.query.state.fetchStatus,
    action: event.action ? event.action.type : null 
  }
  

  // console.log(event);

  const importantTypes = ['updated', 'removed', 'added'];
  if (importantTypes.includes(simplifiedObj.type)) {
    console.log(simplifiedObj);
  }
}

const ReactQueryRewind = () => {
  // React does not allow hooks inside of useEffect 
  const queryClient = useQueryClient();
  useEffect(() => {
    const queryCache = queryClient.getQueryCache();
    // tbh this is a callback - it will only every take in one event. You can't accidentally call this function. It looks like there are ways to do partial checks in enormous objects but it might not be worth it for us. We can type check the fields we care about and send those along to the pure functions
    const unsubscribe = queryCache.subscribe((event: SubscribeEvent) => {
      // setTimeout ensure it runs after components load
      setTimeout(() => {
        // These need to be optimized so that if it's data I don't want, the functions are never called or return as early as possible
        // formatAndSendToChrome(event.query.queryKey, event.query.state.data);
        // for testing purposes
        logging(event);
      }, 0)
    });

    return () => unsubscribe();
  }, []); // Because this component is imported at the root of the app, it re-runs every time anything in the app changes
  // return a fragment to keep react happy, but this affects the build
  return <></>;
}

export default ReactQueryRewind;