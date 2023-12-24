import React from 'react';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ContinuousSlider from './ContinuousSlider';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import { QueryDisplay, SliderSectionProps } from '../types';

const SliderSection = ({
  queryDisplay,
  currentIndex,
  setCurrentIndex,
  handleAutoPlay,
  selectedQueries,
  isPlaying,
}: SliderSectionProps) => {
  const playIcon = isPlaying ? (
    <PauseIcon fontSize='inherit' />
  ) : (
    <PlayArrowIcon fontSize='inherit' />
  );

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        // paddingRight: '0.5rem',
        // backgroundColor: 'rgba(40, 40, 40, 0.5)',
      }}
    >
      <IconButton
        aria-label='play-pause'
        size='large'
        onClick={handleAutoPlay}
        sx={{ '&:hover': { display: 'flex' }, marginRight: '0.5rem' }}
      >
        {playIcon}
      </IconButton>

      <Box
        mr='1rem'
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <span
          style={{
            minWidth: '2rem',
            fontSize: 12,
            position: 'absolute',
            top: '-0.5rem',
            left: '50%',
          }}
        >
          {selectedQueries.length === 0
            ? '0 / 0'
            : `${currentIndex + 1} / ${queryDisplay.length}`}
        </span>
        <ContinuousSlider
          value={currentIndex}
          maxValue={queryDisplay.length - 1}
          onChange={(newIndex: number) => setCurrentIndex(newIndex)}
        />
      </Box>

      <IconButton
        aria-label='previous'
        size='medium'
        disabled={currentIndex === 0}
        onClick={() => setCurrentIndex(0)}
        sx={{
          '&:hover': { display: 'flex' },
          '&.MuiIconButton-root': { padding: '0' },
        }}
      >
        <KeyboardDoubleArrowLeftIcon fontSize='inherit' />
      </IconButton>

      <IconButton
        aria-label='previous'
        size='medium'
        disabled={currentIndex === 0}
        onClick={() => setCurrentIndex(Math.max(currentIndex - 1, 0))}
        sx={{
          '&:hover': { display: 'flex' },
          '&.MuiIconButton-root': { padding: '0' },
        }}
      >
        <KeyboardArrowLeftIcon fontSize='inherit' />
      </IconButton>

      <IconButton
        aria-label='next'
        size='medium'
        disabled={currentIndex === queryDisplay.length - 1}
        onClick={() =>
          setCurrentIndex(Math.min(currentIndex + 1, queryDisplay.length - 1))
        }
        sx={{
          '&:hover': { display: 'flex' },
          '&.MuiIconButton-root': { padding: '0' },
        }}
      >
        <KeyboardArrowRightIcon fontSize='inherit' />
      </IconButton>

      <IconButton
        aria-label='next'
        size='medium'
        disabled={currentIndex === queryDisplay.length - 1}
        onClick={() => setCurrentIndex(queryDisplay.length - 1)}
        sx={{
          '&:hover': { display: 'flex' },
          '&.MuiIconButton-root': { padding: '0' },
        }}
      >
        <KeyboardDoubleArrowRightIcon fontSize='inherit' />
      </IconButton>
    </Box>
  );
};

export default SliderSection;
