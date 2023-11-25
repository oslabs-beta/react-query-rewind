
import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const TestReactQueryRewind = () => {
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

export default TestReactQueryRewind;