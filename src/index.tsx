
import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { SubscribeEvent } from './types';

const ReactQueryRewind = () => {
  // React does not allow hooks inside of useEffect 
  const queryClient = useQueryClient();
  useEffect(() => {
    const queryCache = queryClient.getQueryCache();
    const unsubscribe = queryCache.subscribe((event) => console.log(event));
    return () => unsubscribe();
  }, [])
  // useEffect(() => console.log('Effect in pacakge'), [])
  console.log('React Query Rewind Test');
  return <></>
}


export default ReactQueryRewind;

export const RewindHook = () => {
  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   const queryCache = queryClient.getQueryCache();
  //   const unsubscribe = queryCache.subscribe((event) => console.log(event));
  //   return () => unsubscribe();
  // }, [])

  console.log('Hook Test');
  return;
}