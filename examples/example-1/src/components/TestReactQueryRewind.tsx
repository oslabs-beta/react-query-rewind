
import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const TestReactQueryRewind = () => {
  // React does not allow hooks inside of useEffect 
  const queryClient = useQueryClient();

  const queryCache = queryClient.getQueryCache();
  queryCache.subscribe((event) => console.log(event));
  // useEffect(() => console.log('Effect in pacakge'), [])
  console.log('React Query Rewind Test');
  return <></>
}


export default TestReactQueryRewind;