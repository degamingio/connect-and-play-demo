'use client';

import { Box, CircularProgress, NoSsr } from '@mui/material';
import { useEffect, useState } from 'react';

const LoadingComponent = ({ isLoading }: { isLoading?: boolean }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setFadeOut(true);
    }
  }, [isLoading]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="10vh"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease',
        marginTop: 40,
      }}
    >
      {isLoading && <CircularProgress />}
    </Box>
  );
};

type GameFrameProps = {
  url: string;
  gameName: string;
};

const GameFrame = ({ url, gameName }: GameFrameProps) => {
  const [showFrame, setShowFrame] = useState(false);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        paddingBottom: '56.25%', // 16:9 Aspect Ratio (divide 9 by 16 = 0.5625)
      }}
    >
      {!showFrame && <LoadingComponent isLoading />}
      <NoSsr>
        <iframe
          title="game-frame"
          onLoad={() => setShowFrame(true)}
          id={`${gameName}Id`}
          src={url}
          loading="eager"
          scrolling="no"
          frameBorder="0"
          style={{
            // overflow: 'hidden',
            opacity: showFrame ? 1 : 0,
            transition: 'opacity 0.5s ease', // Smooth transition for opacity
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            // Ratio
            height: '100%',
            // height: 'calc(100vh - 90px)',
          }}
        />
      </NoSsr>
    </Box>
  );
};

export default GameFrame;
