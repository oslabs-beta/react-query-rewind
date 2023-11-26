import React, { useEffect } from 'react';
import ItemContainer from './components/ItemContainer';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
// import ReactQueryRewind, { RewindHook } from 'react-query-rewind';
function App() {
  console.log('React Version:', React.version);

  // RewindHook();

  return (
    <>
      {/* <ReactQueryRewind/> */}
      <ItemContainer />
    </>
  );
}

export default App;
