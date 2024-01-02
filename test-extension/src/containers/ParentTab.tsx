import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ParentTabsProps } from '../types';
import CustomTabPanel from '../components/CustomTabPanel';
import a11yProps from '../functions/a11yProps';
import MetricsTab from './MetricsTab';
import QueriesTab from './QueriesTab';

const ParentTab = ({
  queryEvents,
  selectedQueries,
  handleSelectionChange,
  devToolsPort,
}: ParentTabsProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', height: '3rem' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="QUERIES" {...a11yProps(0)} />
          <Tab label="COMPONENT TREE" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <Box
        sx={{ flexGrow: 1, height: 'calc(100vh - 3rem)', paddingTop: '0.5rem' }}
      >
        <CustomTabPanel value={value} index={0}>
          <QueriesTab
            selectedQueries={selectedQueries}
            queryEvents={queryEvents}
            handleSelectionChange={handleSelectionChange}
            devToolsPort={devToolsPort}
          />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <MetricsTab
            queryEvents={queryEvents}
            selectedQueries={selectedQueries}
          />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default ParentTab;
