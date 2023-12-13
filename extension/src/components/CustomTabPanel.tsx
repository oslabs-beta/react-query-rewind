import React from 'react';
import { TabPanelProps } from '../types';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const CustomTabPanel = ({
  children,
  value,
  index,
  ...other
}: TabPanelProps) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ flexGrow: 1, height: '100%' }}
    >
      {value === index && (
        <Box
          sx={{
            height: '100%',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

export default CustomTabPanel;
