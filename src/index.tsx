
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
        const importantTypes = ['updated', 'removed', 'added'];
        if (importantTypes.includes(event.type)) {
          // if type is added, then only send if action=success and fetchStatus=idle
          if (event.type === 'added' &&
              (
                event.query.state.status !== 'sucess'
                || event.query.state.fetchStatus !== 'idle'
              )
            ) {
            return;
          }
          const simplifiedObj = {
            type: event.type,
            time: event.query.state.dataUpdatedAt, //might need to format this as a datetime
            queryKey: event.query.queryKey, // stringify?
            // func: event.query.options.queryFn,
            data: event.query.state.data, // stringify??
            // status: event.query.state.status,
            // fetchStatus: event.query.state.fetchStatus,
            // action: event.action ? event.action.type : null,
          };
          console.log(simplifiedObj);
          
          try {
            // postMessage takes in:
              // message - can be object with any fields
              // target (just saying all for now)
              // other options
            window.postMessage({
              type: "react-query-rewind",
              payload: simplifiedObj
            }, "*"); // use * for all - not sure if this is secure
          } catch (e) {
            console.log(e);
          }

          localStorage.setItem('test', JSON.stringify(simplifiedObj))
        }
      }, 0)
    });

    return () => unsubscribe();
  }, [])
  // useEffect(() => console.log('Effect in pacakge'), [])
  console.log('React Query Rewind Test');
  return <></>
}


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