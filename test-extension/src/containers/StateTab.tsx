import React from 'react';
import JsonFormatter from '../components/JsonFormatter';
import { useState } from 'react';
import { DataTabProps, ExpandNodesFuncType } from '../types';


const StateTab = ({ queryDisplay, currentIndex }: DataTabProps) => {
  // state to handle open nodes
  const [openNodes, setOpenNodes] = useState(new Set());
  // each item in the set the keyValue

  // function to expand nodes (types can probably be stored globally so code is more dry)
  const expandNodesFunc: ExpandNodesFuncType = (
    keyPath,
    value,
    layer
  ) => {
    // Gets recurisved called and traverses the json in depth first search so we could use it to trac the nodes that are open at any given time
    // console.log('Func called');
    // console.log('keyPath: ', keyPath); // keyPath: the keyPaths (goes in a recursive, depth first approach)
    // console.log('value: ', value); // value: value in that keypath
    // console.log('layer: ', layer); // layer: the depth
    // expand first level

    if (layer < 2) return true;
    return false;
  };

  return (
    <>
      {queryDisplay.length > 0 && queryDisplay[currentIndex] && (
        <div
          className='data'
          style={{ height: '100%', overflow: 'auto' }}
        >
          {queryDisplay[currentIndex].map((queryState) => (
            <>
              <JsonFormatter
                key={queryState.queryKey}
                queryKey={queryState.queryKey}
                jsonData={queryState.queryData}
                expandNodesFunc={expandNodesFunc}
              />
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default StateTab;
