'use client';

import { Alert, Box, Stack, Typography, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import LoadingComponent from '@/components/General/Loading';
import ResponsiveTable from '@/components/General/ResponsiveTable';
import StatusDot from '@/components/LiveBets/StatusDot';
import { useGameplayLogs } from '@/hooks/useGameplayLogs';

type LiveBetsProps = {
  gameId?: string;
  playerAddress?: string;
  casinoOperatorAddress?: string;
  title?: string;
};

const LiveBets = ({
  gameId,
  playerAddress,
  casinoOperatorAddress,
  title,
}: LiveBetsProps) => {
  const t = useTranslations();
  const theme = useTheme();

  const { data, loading } = useGameplayLogs({
    playerAddress,
    casinoOperatorAddress,
    gameId,
  });

  return (
    <Box bgcolor={theme.app?.elevation1} color={theme.app?.primaryContent} p={2}>
      {loading ? (
        <LoadingComponent isLoading={loading} />
      ) : (
        <>
          <Stack direction="row" p={1} alignItems="center">
            <Box sx={{ mr: 2 }}>
              <StatusDot status={data?.length > 0} />
            </Box>
            <Box>
              <Typography variant="subtitle2" textTransform="uppercase" fontWeight="700">
                {title ?? t('components.livebets.header')}
              </Typography>
            </Box>
          </Stack>
          {data?.length > 0 ? (
            <ResponsiveTable showPlayer data={data} />
          ) : (
            <Alert severity="info" sx={{ mt: 3, p: 2 }}>
              {t('components.livebets.noLiveBetsMessage')}
            </Alert>
          )}
        </>
      )}
    </Box>
  );
};

export default LiveBets;
