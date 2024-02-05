'use client';

import { useUserFund } from '@/hooks/useUserFund';
import { useBankroll } from '@/state/BankrollContext';
import { UserContext } from '@/state/UserContext';
import { formatBalance } from '@/utils/wallet.utils';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Fade,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useRef, useState } from 'react';
import { Address, useContractRead } from 'wagmi';
import WalletDropdown from './WalletDropdown';

const WalletDropdownButton = ({
  address,
  isMobile,
}: {
  address: string;
  isMobile?: boolean;
}) => {
  const t = useTranslations();
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useContext(UserContext);
  const anchorRef = useRef(null);
  const theme = useTheme();
  const { bankroll } = useBankroll();
  const [fund, setFund] = useState(user?.funds?.[0]);
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const { data, loading } = useUserFund({ fundId: fund?._id });

  useEffect(() => {
    if (!bankroll) return;
    const fund = user?.funds?.find(
      (f) =>
        f.chainId === bankroll.chainId &&
        f.targetAddress === bankroll.contractAddress &&
        f.tokenAddress === bankroll.tokenAddress,
    );
    if (fund) setFund(fund);
  }, [user, bankroll]);

  const { data: balanceOfData } = useContractRead({
    address: bankroll?.tokenAddress as Address,
    abi: bankroll?.tokenAbi,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  });
  const walletBalance = formatBalance(
    (balanceOfData as unknown as bigint) || 0n,
    bankroll?.tokenDecimals,
  );

  const sessionBalance = formatBalance((fund?.balance as unknown as bigint) || 0n, 0);

  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        disableElevation
        disableRipple
        sx={{
          p: { xs: '8px 12px', md: '0 16px' },
          borderRadius: '12px',
          height: '48px',
          backgroundColor: theme.app?.elevation3,
          ':hover': { backgroundColor: theme.app?.elevation3 },
          minWidth: 0,
        }}
        ref={anchorRef}
        onClick={() => setShowDropdown((s) => !s)}
      >
        <Stack direction="row" alignItems="center" gap={1}>
          {isDesktop ? (
            <Typography
              variant="body2"
              fontWeight={700}
              sx={{ color: theme.app?.buttonTextColor, textTransform: 'none' }}
            >
              {t('components.walletDropdownButton.title')}
            </Typography>
          ) : (
            <Box
              component="img"
              src="/images/wallet.png"
              alt="A wallet with money"
              sx={{ height: { xs: '16px', md: '24px' } }}
            />
          )}

          {showDropdown ? (
            <ExpandLess
              sx={{
                display: { xs: 'none', md: 'block' },
                fontSize: { xs: '16px', md: '24px' },
                m: '-4px',
                color: theme.app?.secondaryAccent,
              }}
            />
          ) : (
            <ExpandMore
              sx={{
                display: { xs: 'none', md: 'block' },
                fontSize: { xs: '16px', md: '24px' },
                m: '-4px',
                color: theme.app?.secondaryAccent,
              }}
            />
          )}
        </Stack>
      </Button>
      <Popover
        open={showDropdown}
        anchorEl={anchorRef.current}
        onClose={() => setShowDropdown(false)}
        disableScrollLock
        slotProps={{
          paper: { sx: { bgcolor: 'transparent' } },
          root: isMobile ? { sx: { bgcolor: 'rgba(0,0,0,0.48)', px: '12px' } } : {},
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: isMobile ? 'center' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: isMobile ? 'center' : 'right',
        }}
        TransitionComponent={Fade}
      >
        <WalletDropdown
          address={address}
          sessionBalance={sessionBalance}
          walletBalance={walletBalance}
        />
      </Popover>
    </>
  );
};

export default WalletDropdownButton;
