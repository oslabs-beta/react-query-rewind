import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import React, { useState } from 'react';

import JsonDiff from '../components/JsonDiff';

import { DataTabProps } from '../types';

const DiffTab = ({ queryDisplay, currentIndex }: DataTabProps) => {
  // state to determine if unchanged are hidden or closed
  const [isHidden, setIsHidden] = useState(false);

  // function to hide/show unchanged data
  const toggleChangedProperties = () => {
    setIsHidden(!isHidden);
  };

  console.log('queryDisplay: ', queryDisplay);

  return (
    <>
      <FormControlLabel
        sx={{ color: 'primary.main', marginLeft: 0 }}
        control={
          <Switch checked={isHidden} onChange={toggleChangedProperties} />
        }
        label={`${isHidden ? 'Show' : 'Hide'} Unchanged Properties `}
      />
      {queryDisplay.length > 0 && queryDisplay[currentIndex] && (
        <div className='data'>
          {queryDisplay[currentIndex].map((queryState, i) => (
            <>
              <Typography variant='h6' sx={{ color: 'secondary.main' }}>
                {queryState.queryKey}
              </Typography>
              <JsonDiff
                key={queryState.queryKey}
                currentJson={queryState.queryData}
                isHidden={isHidden}
                oldJson={
                  currentIndex > 1 && queryState.queryKey
                    ? queryDisplay[currentIndex - 1].find(
                        (obj) => obj.queryKey === queryState.queryKey
                      )?.queryData
                    : null
                }
              />
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default DiffTab;
