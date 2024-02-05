'use client';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';

interface LoadingComponentProps {
  isLoading: boolean;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ isLoading }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (!isLoading) {
      setFadeOut(true);
    }
  }, [isLoading]);

  return (
    <Box
      display="flex"
      alignItems="left"
      justifyContent="center"
      minHeight="10vh"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease',
        marginTop: 40,
      }}
    >
      {isLoading && <CircularProgress sx={{ color: theme.app?.primaryAccent }} />}
    </Box>
  );
};

export default LoadingComponent;
