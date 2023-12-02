import React, { useEffect } from 'react';
import ItemContainer from './components/ItemContainer';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
// import ReactQueryRewind from 'react-query-rewind';

function App() {
  console.log('React Version:', React.version);

  return (
    <>
      <ItemContainer />
    </>
  );
}

export default App;
