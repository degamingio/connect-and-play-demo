'use client';

import { Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type GameHeaderProps = {
  title: string;
  topTitle: string;
};

const GameHeader = ({ title, topTitle }: GameHeaderProps) => {
  const theme = useTheme();

  return (
    <Stack sx={{}} display={{ xs: 'none', md: 'flex' }}>
      <Typography
        fontWeight={400}
        lineHeight={1.64}
        variant="overline"
        color={theme.app?.secondaryContent}
      >
        {topTitle}
      </Typography>
      <Typography fontWeight={700} variant="h6">
        {title}
      </Typography>
    </Stack>
  );
};

export default GameHeader;
