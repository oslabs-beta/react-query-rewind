import React, { useState, useEffect } from 'react';
import { QueryTabProps, QueryDisplay } from '../types';
import a11yProps from '../functions/a11yProps';

import Box from '@mui/material/Box';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import createDisplayArray from '../functions/createDisplayArray';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CustomTabPanel from '../components/CustomTabPanel';
import SliderSection from '../components/SliderSection';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InfoIcon from '@mui/icons-material/Info';
import HistoryIcon from '@mui/icons-material/History';
import Tooltip from '@mui/material/Tooltip';

import StateTab from './StateTab';
import DiffTab from './DiffTab';
import MultiSelect from '../components/MultiSelect';

const QuereisTab = ({
  queryEvents,
  selectedQueries,
  handleSelectionChange,
}: QueryTabProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // holds all query events based on selected queries and query events
  const [queryDisplay, setQueryDisplay] = useState<QueryDisplay[][]>([]);
  // current index of above array
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);

  const [playIcon, setPlayIcon] = useState(
    <PlayArrowIcon fontSize='inherit' />
  );

  // state for switching in and out of timetravel mode
  const [timeTravel, setTimeTravel] = useState<boolean>(false);

  // sends message to the background script whenever timeTravel changes
  useEffect(() => {
    chrome.runtime.sendMessage({
      sender: 'TimeTravel',
      timeTravel: timeTravel,
    });
  }, [timeTravel]);

  const currentQuery = queryDisplay[currentIndex];

  // sends message to the background script whenever currentIndex changes
  useEffect(() => {
    if (currentQuery && currentQuery.length !== 0) {
      chrome.runtime.sendMessage({
        sender: 'UpdateUI',
        currentQuery: queryDisplay[currentIndex],
      });
    }
  }, [currentIndex]);

  // creates array of all states based on selected queries
  useEffect(() => {
    const newQueryDisplay = createDisplayArray(queryEvents, selectedQueries);
    setQueryDisplay(newQueryDisplay);
    setCurrentIndex(0);
  }, [selectedQueries, queryEvents]);

  const handleAutoPlay = () => {
    setIsPlaying((prevIsPlaying) => {
      if (!prevIsPlaying) {
        if (currentIndex >= queryDisplay.length - 1) {
          setCurrentIndex(0);
        }

        const newIntervalId = window.setInterval(() => {
          setCurrentIndex((prevIndex) => {
            if (prevIndex >= queryDisplay.length - 1) {
              clearInterval(newIntervalId);
              return prevIndex;
            }
            return prevIndex + 1;
          });
        }, 1000);

        setIntervalId(newIntervalId);
        return true;
      } else {
        if (intervalId !== undefined) {
          clearInterval(intervalId);
          setIntervalId(undefined);
        }
        return false;
      }
    });
  };

  useEffect(() => {
    if (currentIndex >= queryDisplay.length - 1 && isPlaying) {
      setIsPlaying(false);
    }
  }, [currentIndex, queryDisplay.length, isPlaying]);

  useEffect(() => {
    setPlayIcon(
      isPlaying ? (
        <PauseIcon fontSize='inherit' />
      ) : (
        <PlayArrowIcon fontSize='inherit' />
      )
    );
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        pt: 1,
      }}
    >
      <MultiSelect
        queryEvents={queryEvents}
        handleSelectionChange={handleSelectionChange}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          marginTop: '0.5rem',
        }}
      >
        <ToggleButtonGroup
          color='secondary'
          value={value}
          exclusive
          onChange={handleChange}
          aria-label='Platform'
        >
          <ToggleButton size='small' value={0}>
            STATE
          </ToggleButton>
          <ToggleButton size='small' value={1}>
            DIFF
          </ToggleButton>
        </ToggleButtonGroup>

        <Tooltip title='Time Travel' placement='bottom'>
          <ToggleButton
            sx={{ marginLeft: '1rem' }}
            size='small'
            color='secondary'
            value='check'
            selected={timeTravel}
            onChange={() => setTimeTravel(!timeTravel)}
          >
            <HistoryIcon />
          </ToggleButton>
        </Tooltip>
      </Box>

      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          indicatorColor='primary'
        >
          <Tab
            sx={{ '&.Mui-selected': { color: 'secondary.main' } }}
            label='STATE'
            {...a11yProps(0)}
          />
          <Tab
            sx={{ '&.Mui-selected': { color: 'secondary.main' } }}
            label='DIFF'
            {...a11yProps(1)}
          />
        </Tabs>
      </Box> */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'scroll',
          // backgroundColor: timeTravel? '#cccccc' : ''
        }}
      >
        <CustomTabPanel value={value} index={0}>
          <StateTab queryDisplay={queryDisplay} currentIndex={currentIndex} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <DiffTab queryDisplay={queryDisplay} currentIndex={currentIndex} />
        </CustomTabPanel>
      </Box>
      {/* <span>
        <InfoIcon></InfoIcon>
        <FormControl component='fieldset'>
          <FormControlLabel
            value='timeTravel'
            control={<Switch color='primary' />}
            label='Time Travel'
            labelPlacement='start'
            onChange={() => setTimeTravel(!timeTravel)}
          />
        </FormControl>
      </span> */}
      {/* <ToggleButton
        value="check"
        selected={timeTravel}
        onChange={() => setTimeTravel(!timeTravel)}
      >
        {timeTravel ? "ON" : "OFF"}
      </ToggleButton> */}
      <SliderSection
        queryDisplay={queryDisplay}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        handleAutoPlay={handleAutoPlay}
        selectedQueries={selectedQueries}
        isPlaying={isPlaying}
      />
    </Box>
  );
};

export default QuereisTab;
