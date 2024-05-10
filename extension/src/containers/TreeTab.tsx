import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ComponentTree from '../components/ComponentTree';
import ProfilingToggle from '../components/ProfilingToggle';
import { TreeTabProps } from '../types';

const TreeTab: React.FC<TreeTabProps> = ({
  treeData,
  toggleProfiling,
  profilingStatus,
}) => {
  // console.log('Update tree tab');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        marginTop: '1rem',
      }}
    >
      <ProfilingToggle
        toggleProfiling={toggleProfiling}
        profilingStatus={profilingStatus}
      >
        {profilingStatus ? 'Stop Profiling' : 'Start Profiling'}
      </ProfilingToggle>
      <div className="ct"></div>
      {profilingStatus && (
        <ComponentTree fiberTree={treeData[treeData.length - 1]} />
      )}
    </Box>
  );
};

export default TreeTab;
