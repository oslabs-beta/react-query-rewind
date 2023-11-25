import React, { useEffect } from 'react';
import ItemContainer from './components/ItemContainer';
import ReactQueryRewind from 'react-query-rewind/dist/bundle.esm';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

function App() {
  console.log('React Version:', React.version);

  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   const queryCache = queryClient.getQueryCache();
  //   const unsubscribe = queryCache.subscribe((event) => {
  //     console.log(event);
  //   });
  //   return () => unsubscribe();
  // }, [])

  return (
    <>
      {/* <ReactQueryRewind/> */}
      <ItemContainer />
    </>
  );
}

export default App;
