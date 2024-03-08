import './css/styles.css';
import React, { useState, useEffect } from 'react';
import ParentTab from './containers/ParentTab';
import { QueryEvent } from './types';
import saveSelectedQueryKeys from './functions/saveSelectedQueryKeys';
import Container from '@mui/material/Container';
// import { Port } from 'chrome.runtime';

type QueryMetrics = {
  // [queryKey: ]
};

function App() {
  // state to store changes to query cache
  const [queryEvents, setQueryEvents] = useState<QueryEvent[]>([]);
  const [queryMetrics, setQueryMetrics] = useState();
  const [selectedQueries, setSelectedQueries] = useState<string[]>([]);
  const [devToolsPort, setDevToolsPort] = useState<chrome.runtime.Port | null>(
    null
  );
  const [treeData, setTreeData] = useState<any>('');

  // adds event listeners when component mountsx
  useEffect(() => {
    // connects to background.js
    let port = chrome.runtime.connect({ name: 'background-devtool' });
    setDevToolsPort(port);

    // tell background.ts to inject the content script into the tab
    port.postMessage({
      action: 'injectContentScript',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });

    // listents for messages from npm package
    port.onMessage.addListener(message => {
      console.log('DEVTOOL: Recieved message from background.ts', message);

      if (message.type === 'event') {
        setQueryEvents(queryEvents => [...queryEvents, message.payload]);
      }

      if (message.type === 'tree') {
        console.log('APP.tsx: Recieved tree data', message);
        setTreeData(message.data);
      }
    });

    // reloads DevTool panel
    // need to define exact function for the listener to be removed in return
    const windowReloaded = () => {
      window.location.reload();
    };

    // event listner triggered when user navigates to new tab / reloads page
    chrome.devtools.network.onNavigated.addListener(windowReloaded);

    // cleanup 2 listeners on component dismount
    return () => {
      port.disconnect();
      chrome.devtools.network.onNavigated.removeListener(windowReloaded);
    };
  }, []);

  // adds event listener for when devToolsPort is disconnected
  devToolsPort?.onDisconnect.addListener(() => {
    console.log('DevTools port disconnected, port: ', devToolsPort);
    // setDevToolsPort(null);
  });

  // updates state for selected queries
  const handleSelectionChange = (queries: string[]) => {
    setSelectedQueries(queries);
    saveSelectedQueryKeys(queries);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ParentTab
        // queryOptions={queryOptions}
        queryEvents={queryEvents}
        selectedQueries={selectedQueries}
        handleSelectionChange={handleSelectionChange}
        devToolsPort={devToolsPort}
        treeData={treeData}
      />
    </Container>
  );
}

export default App;
