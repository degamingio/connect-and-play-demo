'use client';

import LiveBets from '@/components/LiveBets/LiveBets';
import PlayerCard from '@/components/Player/Card';
import Statistics from '@/components/Player/Statistics';
import { AppConfig } from '@/config/AppConfig';
import { Stack, Typography, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const AccountPage = () => {
  const { push } = useRouter();
  const queryAddress = useSearchParams().get('a') || undefined;
  const { address: accountAddress, status } = useAccount();
  const t = useTranslations();
  const theme = useTheme();

  const [address, setAddress] = useState<undefined | string>(queryAddress);

  const isMe =
    !queryAddress || (status === 'connected' && queryAddress === accountAddress);

  useEffect(() => {
    if (queryAddress) return;
    if (!queryAddress && !['connected', 'reconnecting'].includes(status)) push('/');

    setAddress(accountAddress);
  }, [queryAddress, status, push, accountAddress]);

  return (
    <>
      <Stack
        py={{ sm: 3, md: 2 }}
        px={{ sm: 0, md: 3 }}
        gap={2}
        bgcolor={theme.app?.elevation1}
        borderRadius={1}
      >
        <Typography variant="h5" fontWeight={700} fontSize="2rem">
          {t('account.title')}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={2} alignItems="flex-start">
          <PlayerCard />
          <Statistics walletAddress={address!} />
        </Stack>
      </Stack>
      {address && (
        <LiveBets
          title={t('account.livebetTitle')}
          playerAddress={address}
          operatorCode={AppConfig.operatorCode}
        />
      )}
    </>
  );
};

export default AccountPage;
