import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ComponentTree from '../components/Tree';
import ProfilingToggle from '../components/ProfilingToggle';

const TreeTab:React.FC<any> = ({treeData}) => {
  console.log('Tree Tab loaded');

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "tree") {
      console.log("Received component tree events:", message.data);
      // Handle the received data as needed
  
      // Optionally, send a response back to the content script
      sendResponse({ status: "success", data: "Processed EVENT_LIST" });
    }
  
    // Return true if you want to send a response asynchronously
    // (this is necessary if the response will not be sent immediately)
    return true;
  });
  

  const [value, setValue] = React.useState(0);
  const [selectedQueries, setSelectedQueries] = useState<string[]>([]);

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
