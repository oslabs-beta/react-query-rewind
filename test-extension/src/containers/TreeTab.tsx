import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ComponentTree from '../components/ComponentTree';
import ProfilingToggle from '../components/ProfilingToggle';

const TreeTab:React.FC<any> = ({treeData, devToolsPort}) => {
  console.log('Tree Tab loaded');
  console.log('Tree Data in Tree tab:', treeData);

  //state for navigating between tree and charts
  const [profilingStatus, setProfilingStatus] = useState<boolean>(false);

  // Ideally we ensure we only profile when the user wants us to. So we need to send a message that doesn't inject the inject.ts script until the user clicks the profiling toggle
  function sendMessageToContentScript(profilingEnabled: boolean) {
    // only send message if devToolsPort is available and profiling is enabled
    if (devToolsPort && profilingEnabled) {
      devToolsPort.postMessage({
        type: 'profiling-status',
        payload: profilingEnabled,
      });
    }
  }


  const toggleProfiling = () => {
    console.log('toggleProfiling clicked');
    const newProfilingStatus = !profilingStatus;
    setProfilingStatus(newProfilingStatus);
    sendMessageToContentScript(newProfilingStatus);
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
