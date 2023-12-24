import React from 'react';
import { JSONTree } from 'react-json-tree';
import { JsonFormatterType } from '../types';


// https://github.com/reduxjs/redux-devtools/tree/75322b15ee7ba03fddf10ac3399881e302848874/src/react/themes
const theme = {
  base00: 'transparent',
};

const JsonFormatter: React.FC<JsonFormatterType> = ({ jsonData, queryKey, expandNodesFunc }) => {
  // update data so that query key is the root
  const dataWithKey = { [queryKey]: jsonData };

  return (
    <div>
      <JSONTree
        data={dataWithKey}
        theme={theme}
        hideRoot={true}
        shouldExpandNodeInitially={expandNodesFunc}
      />
    </div>
  );
};

export default JsonFormatter;
