import React from 'react';
import ItemContainer from './components/ItemContainer';
// import { useReactQueryRewind } from './../dist/esm';

function App() {
  // dev tooling to track changes to queryClient. Errors right now
  // useReactQueryRewind();

  return (
    <>
      <ItemContainer />
    </>
  );
}

export default App;
