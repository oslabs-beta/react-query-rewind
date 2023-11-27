import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

type SubscribeEvent = {
  type: string;
  query: {
    state: {
      data: any;
    };
  };
};

const cleanData = (event: SubscribeEvent) => {
  const relevantTypes = ['added', 'removed', 'updated'];
  const eventType = event.type;

  if (!relevantTypes.includes(eventType)) return;

  console.log(event);

  // if (event.type === 'added') {
  //   console.log('ADDED', event.query.state.data);
  // }

  // if (event.type === 'updated') {
  //   console.log('UPDATED', event.query.state.data);
  // }
};

const ReactQueryRewind = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const queryCache = queryClient.getQueryCache();

    const unsubscribe = queryCache.subscribe((event: SubscribeEvent) => {
      cleanData(event);
    });

    return () => unsubscribe();
  }, []);
  return <></>;
};

export default ReactQueryRewind;

export const RewindHook = () => {
  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   const queryCache = queryClient.getQueryCache();
  //   const unsubscribe = queryCache.subscribe((event) => console.log(event));
  //   return () => unsubscribe();
  // }, [])

  return;
};
