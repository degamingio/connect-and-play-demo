'use client';

import SiweUserContext, { SiweStatus } from '@/state/SiweUserContext';
import { NoSsr, Skeleton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import WalletDropdownButton from './WalletDropdownButton';

const WalletDropdownLoader = ({ isMobile }: { isMobile?: boolean }) => {
  const { address } = useAccount();
  const { isFetching, isLoading } = useWalletClient();
  const { status: siweStatus } = useContext(SiweUserContext);

  const theme = useTheme();

  if (isFetching || isLoading)
    return (
      <Skeleton
        variant="rounded"
        width={64}
        height={48}
        sx={{ backgroundColor: theme.app?.elevation3, borderRadius: 20 }}
      />
    );

  if (!address || siweStatus !== SiweStatus.authenticated) return null;

  return <WalletDropdownButton address={address} isMobile={isMobile} />;
};

const WalletDropdown = ({ isMobile }: { isMobile?: boolean }) => (
  <NoSsr>
    <WalletDropdownLoader isMobile={isMobile} />
  </NoSsr>
);

export default WalletDropdown;
