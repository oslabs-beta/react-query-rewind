import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ComponentTree from '../components/ComponentTree';
import ProfilingToggle from '../components/ProfilingToggle';

const TreeTab:React.FC<any> = ({treeData}) => {
  console.log('Tree Tab loaded');
  console.log('Tree Data in Tree tab:', treeData);

  //state for navigating between tree and charts
  const [view, setView] = useState<string>('treeView');
  const [profilingStatus, setProfilingStatus] = useState<boolean>(false);

  // Not sure what this does. What I really need is 1) profiling toggle to work and 2) ensure we only profile when the user wants us to. So we need to send a message that doesn't inject the inject.ts script until the user clicks the profiling toggle
  function sendMessageToContentScript(message: any) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', marginTop: '1rem' }}>
        <ProfilingToggle onClick={() => setProfilingStatus(true)}>
          {profilingStatus ? 'Stop Profiling' : 'Start Profiling'}
        </ProfilingToggle>
        <div className='ct'></div>
        {view === 'treeView' && (
          <ComponentTree fiberTree={treeData[treeData.length - 1]} />
        )}
    </Box>
  );
};

export default TreeTab;
