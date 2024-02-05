'use client';

import { BankrollProvider } from '@/state/BankrollContext';
import { Stack } from '@mui/material';
import BankrollHeader from './BankrollHeader';
import BankrollSelector from './BankrollSelector';
import LiquidityProvider from './LiquidityProvider';

const Bankroll = () => {
  return (
    <BankrollProvider>
      <Stack
        py={{ xs: 3, md: 2 }}
        px={{ xs: 2, md: 2 }}
        gap={2}
        borderRadius={1}
        bgcolor="background.paper"
      >
        <BankrollSelector />
        <BankrollHeader />
        <LiquidityProvider />
      </Stack>
    </BankrollProvider>
  );
};

export default Bankroll;
