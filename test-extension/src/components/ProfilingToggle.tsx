import React, { useState, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 38,
  height: 22,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 18,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(15px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        //   backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.primary.main
            : theme.palette.secondary.main,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 16,
    height: 16,
    borderRadius: '50%',
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 11,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

interface ProfilingToggleProps {
  onClick?: () => void;
  children?: ReactNode; // Allow children in the component
}

const ProfilingToggle: React.FC<ProfilingToggleProps> = ({
  onClick,
  children,
}) => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked((prev: any) => !prev);
    if (onClick) {
      onClick();
    }
  };

  //   export default function ProfilingToggle() {
  return (
    <FormGroup>
      <Stack direction='row' spacing={1} alignItems='center'>
        <AntSwitch
          checked={checked}
          onChange={handleToggle}
          inputProps={{ 'aria-label': 'ant design' }}
        />
        <span>{children}</span>
      </Stack>
    </FormGroup>
  );
};

export default ProfilingToggle;
