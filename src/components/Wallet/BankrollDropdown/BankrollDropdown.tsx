'use client';

import { useBankroll } from '@/state/BankrollContext';
import { useOperator } from '@/state/OperatorContext';
import { BankrollType } from '@/types';
import { formatBankrollBalance } from '@/utils/wallet.utils';
import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { type Address } from 'viem';
import { useContractRead } from 'wagmi';

const SelectButton = ({
  text,
  loading,
  color = 'primary',
  disabled = false,
  variant = 'contained',
  onClick,
}: {
  text: string;
  loading: boolean;
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  onClick: () => void;
}) => {
  const theme = useTheme();

  return (
    <Box>
      {loading ? (
        <CircularProgress sx={{ ml: 'auto' }} color={color} size={25} />
      ) : (
        <Button
          variant={variant}
          onClick={() => onClick()}
          disabled={disabled}
          color={color}
          size="small"
          disableElevation
          sx={{
            ml: 'auto',
            textTransform: 'none',
            fontFamily: theme.app?.fontFamilyAccent,
            whiteSpace: 'nowrap',
            minWidth: '80px',
            borderRadius: '12px',
            padding: '8px 16px',
            // height: '48px',
          }}
        >
          {text}
        </Button>
      )}
    </Box>
  );
};

const BankrollRow = ({
  bankroll,
  selected,
}: {
  bankroll: BankrollType;
  selected: boolean;
}) => {
  const theme = useTheme();
  const t = useTranslations();
  const { setBankroll } = useBankroll();
  const { push } = useRouter();

  const { data: balanceOfData } = useContractRead({
    address: bankroll?.tokenAddress as Address,
    abi: bankroll?.tokenAbi,
    functionName: 'balanceOf',
    args: [bankroll?.contractAddress],
  });
  const bankrollBalance = formatBankrollBalance(
    (balanceOfData as unknown as bigint) || 0n,
    bankroll?.tokenDecimals,
  );

  return (
    <Stack
      key={bankroll.contractAddress}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={1}
    >
      <Badge
        sx={{ cursor: 'pointer' }}
        onClick={() => push('/bankrolls')}
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

      <Stack
        direction="column"
        alignItems="start"
        gap={0}
        sx={{ mr: 8, cursor: 'pointer' }}
        onClick={() => push('/bankrolls')}
      >
        <Typography
          variant="caption"
          fontWeight={700}
          sx={{
            color: theme.app?.buttonTextColorDark,
            textTransform: 'uppercase',
            fontSize: '10px',
          }}
        >
          {bankroll?.tokenSymbol}
        </Typography>
        <Typography
          variant="body2"
          fontWeight={700}
          sx={{ color: theme.app?.buttonTextColor, textTransform: 'none' }}
        >
          ${bankrollBalance}
        </Typography>
      </Stack>

      <SelectButton
        variant="contained"
        color="secondary"
        text={
          selected
            ? t('components.bankrollDropdown.bankrollRow.selectedButton')
            : t('components.bankrollDropdown.bankrollRow.selectButton')
        }
        loading={false}
        onClick={() => {
          setBankroll(bankroll);
        }}
      />
    </Stack>
  );
};

const BankrollDropdown = ({}: {}) => {
  const theme = useTheme();
  const { operator } = useOperator();
  const { bankroll } = useBankroll();

  return (
    <Stack
      width="100%"
      bgcolor={theme.app?.elevation3}
      maxWidth={{ xs: '100%', sm: '334px' }}
      mt={1}
      p={{ xs: '12px', md: 3 }}
      gap={2}
      direction="column"
      sx={{ borderRadius: '8px' }}
    >
      {operator?.bankrolls.map((b) =>
        BankrollRow({
          bankroll: b,
          selected: b.contractAddress === bankroll?.contractAddress,
        }),
      )}
    </Stack>
  );
};

export default BankrollDropdown;
