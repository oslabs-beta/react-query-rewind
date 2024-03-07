import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ComponentTree from '../components/ComponentTree';
import ProfilingToggle from '../components/ProfilingToggle';

const TreeTab:React.FC<any> = ({treeData}) => {
  console.log('Tree Tab loaded');
  console.log('Tree Data in Tree tab:', treeData);

  //state for navigating between tree and charts
  const [profilingStatus, setProfilingStatus] = useState<boolean>(false);

  // Ideally we ensure we only profile when the user wants us to. So we need to send a message that doesn't inject the inject.ts script until the user clicks the profiling toggle
  function sendMessageToContentScript(profilingEnabled: boolean) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      console.log('tabs: ', tabs);
      chrome.tabs.sendMessage(tabs[0].id, { type: 'profilingStatus', profilingStatus: profilingEnabled});
    });
  }

  const toggleProfiling = () => {
    console.log('toggleProfiling clicked');
    const newProfilingStatus = !profilingStatus;
    setProfilingStatus(newProfilingStatus);
    // sendMessageToContentScript(newProfilingStatus);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', marginTop: '1rem' }}>
        <ProfilingToggle onClick={toggleProfiling}>
          {profilingStatus ? 'Stop Profiling' : 'Start Profiling'}
        </ProfilingToggle>
        <div className='ct'></div>
        { profilingStatus && (
          <ComponentTree fiberTree={treeData[treeData.length - 1]} />
        )}
    </Box>
  );
};

export default TreeTab;
