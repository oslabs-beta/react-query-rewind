import React, { useCallback, useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import '../css/styles.css';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import {
  customStringify,
  sendData,
  saveJSON,
} from '../functions/treeHelperFuncs';

interface ComponentTreeProps {
  fiberTree: any; // Replace 'any' with the actual type of fiberTree
}

// set up a centered tree visualization
function ComponentTree({ fiberTree }: ComponentTreeProps) {
  const useCenteredTree = (
    defaultTranslate: { x: number; y: number } = { x: 0, y: 0 }
  ) => {
    const [translate, setTranslate] = useState(defaultTranslate);
    const [dimensions, setDimensions] = useState<
      { width: number; height: number } | undefined
    >();

    const containerRef = useCallback((containerElem: HTMLDivElement | null) => {
      if (containerElem !== null) {
        const { width, height } = containerElem.getBoundingClientRect();
        setDimensions({ width, height });
        setTranslate({ x: width / 2, y: height / 12 });
      }
    }, []);

    return [dimensions, translate, containerRef] as const;
  };

  const [dimensions, translate, containerRef] = useCenteredTree();
  const [recButton, setRecButton] = useState<string>('START PROFILING');
  const [idk, setIdk] = useState<any[]>([]);
  //state for navigating between tree and charts
  //const [view, setView] = useState<string>("treeView");
  //state for recording status, default to false;
  const [recStat, setRecStat] = useState<boolean>(false);
  // const [recButton, setRecButton] = useState<string>("START PROFILING");
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
        message: `Hello from popup! ${idk.length}`,
      });
      setChartData([...idk]);
    } else {
      setRecButton('Stop profiling');
      sendMessageToContentScript({
        message: `Hello from popup! ${idk.length}`,
      });
    }
  }, [recStat]);

  const stringifiedResult = customStringify(fiberTree);

  return (
    <>
      {fiberTree ? (
        <div style={{ width: '100%', height: '100%' }}>
          <IconButton
            aria-label='delete'
            onClick={() => saveJSON(fiberTree, 'parseTreeData')}
          >
            <DownloadIcon />
          </IconButton>
          <div
            id='treeWrapper'
            style={{
              width: '100%',
              height: '100%',
            }}
            ref={containerRef}
          >
            <Tree
              data={fiberTree}
              orientation='vertical'
              rootNodeClassName='node__root'
              branchNodeClassName='node__branch'
              leafNodeClassName='node__leaf'
              enableLegacyTransitions
              translate={translate}
            />
          </div>
        </div>
      ) : (
        <p>
          COMPONENT TREE - if your component tree isn't rendering, make sure you
          have React DevTools installed and try again!
        </p>
      )}
    </>
  );
}

export default ComponentTree;
