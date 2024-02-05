'use client';

import SiweUserContext, { SiweStatus } from '@/state/SiweUserContext';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Button, Skeleton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';
import { useDisconnect } from 'wagmi';
import Avatar from './Avatar';

const CustomConnectButton = ({
  account,
  chain,
  openAccountModal,
  openChainModal,
  openConnectModal,
  authenticationStatus,
  mounted,
}: any) => {
  const theme = useTheme();
  const t = useTranslations();
  const { disconnectAsync: disconnectWallet } = useDisconnect();
  const { status: siweStatus, ensureAuthenticated } = useContext(SiweUserContext);
  const [authInProgress, setAuthInProgress] = useState(false);
  const [userRejectedSignIn, setUserRejectedSignIn] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleConnect = () => {
    gtag('event', 'connectButtonClicked');
    openConnectModal();
    setUserRejectedSignIn(false);
  };

  // Note: If your app doesn't use authentication, you
  // can remove all 'authenticationStatus' checks
  const ready = mounted && authenticationStatus !== 'loading';
  const connected =
    ready &&
    account &&
    chain &&
    (!authenticationStatus || authenticationStatus === 'authenticated');

  if (
    connected &&
    !userRejectedSignIn &&
    siweStatus === SiweStatus.unauthenticated &&
    !authInProgress
  ) {
    setAuthInProgress(true);
    ensureAuthenticated().then((success) => {
      if (!success) {
        disconnectWallet();
        setUserRejectedSignIn(true);
      }
      setAuthInProgress(false);
    });
  }

  if (!ready || authInProgress)
    return (
      <Skeleton
        variant="rounded"
        sx={{
          bgcolor: 'secondary.light',
          borderRadius: '12px',
          width: { xs: '65px', md: '155px' },
        }}
        height={48}
      />
    );

  if (!connected)
    return (
      <>
        <Button
          color="primary"
          variant="contained"
          disableElevation
          disableRipple
          sx={{
            color: theme.app?.buttonTextColor,
            p: { xs: '8px 8px', md: '0 16px' },
            borderRadius: '12px',
            height: '48px',
            textTransform: 'none',
            fontWeight: 'bold',
            backgroundColor: theme.app?.elevation3,
          }}
          onClick={handleConnect}
          type="button"
        >
          {isDesktop && (
            <Box
              component="img"
              src="/images/wallet.png"
              alt="wallet with money"
              sx={{ height: { xs: '16px', md: '24px' }, mr: '8px' }}
            />
          )}
          {isDesktop
            ? t('components.walletButton.connectTitle')
            : t('components.walletButton.connectTitleShort')}
        </Button>
      </>
    );
  if (chain.unsupported)
    return (
      <Button
        color="error"
        variant="contained"
        disableElevation
        sx={{
          borderRadius: 999,
          height: '48px',
          textTransform: 'none',
          fontWeight: 'bold',
        }}
        onClick={openChainModal}
        type="button"
      >
        {t('components.walletButton.unsupportedChainTitle')}
      </Button>
    );
  return (
    <Button
      color="secondary"
      variant="contained"
      sx={{
        borderRadius: '12px',
        height: '48px',
        p: { xs: '8px 12px', md: '0 16px' },
        backgroundColor: theme.app?.elevation3,
        ':hover': { backgroundColor: theme.app?.elevation3 },
        minWidth: 0,
      }}
      onClick={openAccountModal}
      disableElevation
      disableRipple
    >
      <Stack direction="row" gap={1} alignItems="center">
        <Avatar size={isDesktop ? 24 : 16} address={account.address} />
        <ExpandMore
          sx={{
            display: { xs: 'none', md: 'block' },
            fontSize: { xs: '16px', md: '24px' },
            m: '-4px',
            color: theme.app?.secondaryAccent,
          }}
        />
      </Stack>
    </Button>
  );
};

const WalletButton = () => {
  return (
    <ConnectButton.Custom>
      {(props) => (
        <CustomConnectButton
          {...props}
          // showBalance={false}
          // accountStatus="avatar"
          // label={connectWalletText}
          // chainStatus="icon"
        />
      )}
    </ConnectButton.Custom>
  );
};

export default WalletButton;
