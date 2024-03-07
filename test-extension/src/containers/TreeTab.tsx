import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { BasicTabsProps } from '../types';
import ComponentTree from '../components/Tree';
import ProfilingToggle from '../components/ProfilingToggle';

const TreeTab = ({ queryEvents }: BasicTabsProps) => {
  const [value, setValue] = React.useState(0);
  const [selectedQueries, setSelectedQueries] = useState<string[]>([]);

  const [treeData, setTreeData] = useState<any[]>([]);
  //state for navigating between tree and charts
  const [view, setView] = useState<string>('treeView');
  //state for recording status, default to false;
  const [recStat, setRecStat] = useState<boolean>(false);
  const [recButton, setRecButton] = useState<string>('START PROFILING');
  const [chartData, setChartData] = useState<any[]>([]);

  const setStatus = () => {
    setRecStat((prevRecStat) => !prevRecStat);
  };

  function sendMessageToContentScript(message: any) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }

  //update recButton according to recStat
  useEffect(() => {
    if (!recStat) {
      setRecButton('Start profiling');
      sendMessageToContentScript({
        message: `Hello from popup! ${treeData.length}`,
      });
      setChartData([...treeData]);
    } else {
      setRecButton('Stop profiling');
      sendMessageToContentScript({
        message: `Hello from popup! ${treeData.length}`,
      });
    }
  }, [recStat]);

  useEffect(() => {
    const msgListener = (request: any, sender: any, sendResponse: any) => {
      console.log('inside use effect', request);
      if (recStat) {
        console.log('inside use effect', JSON.parse(request.data));
        switch (request.action) {
          case 'EVENT_LIST':
            if (request.data) {
              setTreeData([...JSON.parse(request.data)]);
            }
            break;
        }
      }
    };

    chrome.runtime.onMessage.addListener(msgListener);

    return () => {
      chrome.runtime.onMessage.removeListener(msgListener);
    };
  }, [recStat]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', marginTop: '1rem' }}>
        <ProfilingToggle onClick={() => setStatus()}>
          {recButton}
        </ProfilingToggle>
        <div className='ct'></div>
        {view === 'treeView' && (
          <ComponentTree fiberTree={treeData[treeData.length - 1]} />
        )}
    </Box>
  );
};

export default TreeTab;
