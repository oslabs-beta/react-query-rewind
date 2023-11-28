import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { SubscribeEvent } from './types';

// import formatAndSendToChrome from './lib/rewind'

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
        console.log(event);
        // logging(event);
      }, 0);
    });

    return () => unsubscribe();
  }, []);
  // useEffect(() => console.log('Effect in pacakge'), [])
  console.log('React Query Rewind Test');
  return <></>;
};

export default ReactQueryRewind;

// export const RewindHook = () => {
//   // const queryClient = useQueryClient();
//   // useEffect(() => {
//   //   const queryCache = queryClient.getQueryCache();
//   //   const unsubscribe = queryCache.subscribe((event) => console.log(event));
//   //   return () => unsubscribe();
//   // }, [])

//   console.log('Hook Test');
//   return;
// }
