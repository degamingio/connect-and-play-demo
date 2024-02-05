'use client';

import { useUserFund } from '@/hooks/useUserFund';
import { useBankroll } from '@/state/BankrollContext';
import { UserContext } from '@/state/UserContext';
import { formatBankrollBalance } from '@/utils/wallet.utils';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Button,
  Fade,
  Popover,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { Address, useContractRead } from 'wagmi';
import BankrollDropdown from './BankrollDropdown';

const BankrollDropdownButton = ({ isMobile }: { isMobile?: boolean }) => {
  const t = useTranslations();
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useContext(UserContext);
  const anchorRef = useRef(null);
  const theme = useTheme();
  const { bankroll } = useBankroll();
  const [fund, setFund] = useState(user?.funds?.[0]);

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
    args: [bankroll?.contractAddress],
    watch: true,
  });
  const bankrollBalance = formatBankrollBalance(
    (balanceOfData as unknown as bigint) || 0n,
    bankroll?.tokenDecimals,
  );

  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        disableElevation
        sx={{
          borderRadius: '12px',
          height: '48px',
          backgroundColor: theme.app?.elevation3,
          p: { xs: '8px 12px', md: '0 16px' },
          ':hover': { backgroundColor: theme.app?.elevation3 },
        }}
        ref={anchorRef}
        onClick={() => setShowDropdown((s) => !s)}
      >
        <Stack direction="row" alignItems="center" gap={1}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              bankroll && (
                <Avatar
                  alt={bankroll?.tokenName}
                  src={`/images/chain-logo-${bankroll?.chainId}.png`}
                  sx={{ height: '10px', width: '10px' }}
                />
              )
            }
          >
            {bankroll && (
              <Avatar
                alt={bankroll?.tokenName}
                src={`/images/${bankroll?.tokenSymbol}.png`}
                sx={{
                  height: { xs: '16px', md: '24px' },
                  width: { xs: '16px', md: '24px' },
                }}
              />
            )}
          </Badge>

          <Stack direction="column" alignItems="start" gap={0}>
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{
                color: theme.app?.buttonTextColorDark,
                textTransform: 'uppercase',
                fontSize: '10px',
              }}
            >
              {t('components.bankrollDropdownButton.title')}
            </Typography>
            <Typography
              variant="body2"
              fontWeight={700}
              sx={{ color: theme.app?.buttonTextColor, textTransform: 'none' }}
            >
              ${bankrollBalance}
            </Typography>
          </Stack>
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
        <BankrollDropdown />
      </Popover>
    </>
  );
};

export default BankrollDropdownButton;
