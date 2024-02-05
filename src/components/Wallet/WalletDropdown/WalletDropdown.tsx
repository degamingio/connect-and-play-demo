'use client';

import TokenIcon from '@/components/General/CurrencySymbol';
import { AppConfig } from '@/config/AppConfig';
import { usePreparedContractWriteFlow } from '@/hooks/useContractWriteFlow';
import { getBearerToken } from '@/libs/bearerToken';
import { useBankroll } from '@/state/BankrollContext';
import { useOperator } from '@/state/OperatorContext';
import { UserContext } from '@/state/UserContext';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';
import { parseUnits, type Address } from 'viem';

const AddButton = ({
  text,
  color = 'success',
  disabled = false,
  variant = 'outlined',
  onClick,
}: {
  text: string;
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  onClick: () => void;
}) => {
  const theme = useTheme();
  return (
    <Button
      variant={variant}
      onClick={() => onClick()}
      disabled={disabled}
      color={color}
      size="small"
      disableElevation
      disableRipple
      sx={{
        textTransform: 'none',
        fontFamily: theme.app?.fontFamilyAccent,
        whiteSpace: 'nowrap',
        minWidth: '50px',
        backgroundColor: theme.app?.secondaryContent,
        borderRadius: '18px',
        // padding: '8px 16px',
        boxShadow: '0 4px 4px #2525251a, inset 0 1px #ffffff0a',
        ':hover': {
          backgroundColor: theme.app?.secondaryContent,
        },
      }}
    >
      {text}
    </Button>
  );
};

const CtaButton = ({
  text,
  loading,
  color = 'primary',
  disabled = false,
  variant = 'contained',
  fullWidth = false,
  onClick,
  sx,
}: {
  text: string;
  loading: boolean;
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  fullWidth?: boolean;
  onClick: () => void;
  sx?: any;
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: fullWidth ? '100%' : 'auto' }}>
      <Button
        variant={variant}
        onClick={() => onClick()}
        disabled={disabled || loading}
        color={color}
        size="large"
        disableElevation
        disableRipple
        sx={{
          ml: 'auto',
          textTransform: 'none',
          fontFamily: theme.app?.fontFamilyAccent,
          whiteSpace: 'nowrap',
          minWidth: '80px',
          borderRadius: '12px',
          padding: '8px 16px',
          height: '48px',
          width: fullWidth ? '100%' : 'auto',
          ...sx,
        }}
      >
        {loading ? (
          <CircularProgress sx={{ ml: 'auto', mr: '9px' }} color={color} size={30} />
        ) : (
          text
        )}
      </Button>
    </Box>
  );
};

const BalanceRow = ({ address, balance }: { address: string; balance: string }) => {
  const t = useTranslations();
  const { bankroll } = useBankroll();
  const { write, isLoading } = usePreparedContractWriteFlow({
    address: bankroll?.tokenAddress as Address,
    abi: bankroll?.tokenAbi,
    functionName: 'mint',
    args: [address, parseUnits('1000', bankroll?.tokenDecimals!)],
  });

  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="body2" fontWeight={700}>
        {t('components.walletDropdown.balanceRow.title')}:
      </Typography>
      <Stack direction="column" gap={1} alignItems="end">
        <Stack direction="row" gap={1} alignItems="center">
          <Typography variant="body2" color={(th) => th.app?.primaryAccent}>
            {balance}
          </Typography>
          {bankroll && (
            <TokenIcon
              size={20}
              token={bankroll?.tokenSymbol}
              alt={bankroll?.tokenName}
            />
          )}
        </Stack>
        {AppConfig.showIncreaseBalanceButton && (
          <CtaButton
            text={t('components.walletDropdown.balanceRow.addFundsButton')}
            loading={!write || isLoading}
            onClick={() => write?.()}
          />
        )}
      </Stack>
    </Stack>
  );
};

const SessionBalanceRow = ({
  sessionBalance,
  walletBalance,
}: {
  sessionBalance: string;
  walletBalance: string;
}) => {
  const t = useTranslations();
  const theme = useTheme();
  const [transferAmount, setTransferAmount] = useState(0n);
  const [inputError, setInputError] = useState<unknown>();
  const [inputValue, setInputValue] = useState<string>('');
  const { balanceIsUpdated } = useContext(UserContext);
  const { bankroll } = useBankroll();
  const { operator } = useOperator();

  const {
    writeAsync,
    isLoading,
    prepareValues: { error },
  } = usePreparedContractWriteFlow({
    address: bankroll?.tokenAddress as Address,
    abi: bankroll?.tokenAbi,
    functionName: 'transfer',
    args: [operator?.managerWalletAddress, transferAmount],
  });

  const handleConfirm = async () => {
    try {
      if (transferAmount <= 0) throw new Error('Too low value');
      await writeAsync();
      setInputValue('');
      balanceIsUpdated();
    } catch (error) {
      setInputError(error);
    }
  };

  const addToInput = (amountToAdd: number): number | string => {
    const total = +inputValue + amountToAdd;
    if (total > +walletBalance) {
      return walletBalance;
    }
    return total;
  };

  const handleInputValue = (value: string | number) => {
    try {
      let newValue = +value < 0 ? '0' : value + '';
      if (newValue.replaceAll(',', '.').includes('.')) {
        const [, decimal] = newValue.split('.');

        // restrict value to only 2 decimal places
        if ((decimal as string)?.length > 2) {
          newValue = (+value)?.toFixed(2);
        }
      }
      setInputValue('' + newValue);
      setTransferAmount(parseUnits(`${newValue}`, bankroll?.tokenDecimals!));
      setInputError(undefined);
      console.log(newValue);
    } catch (error) {
      setInputError(error);
    }
  };

  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" fontWeight={700}>
          {t('components.walletDropdown.sessionBalanceRow.title')}:
        </Typography>
        <Stack direction="row" gap={1} alignItems="center">
          <Typography variant="body2" color={(th) => th.app?.primaryAccent}>
            {sessionBalance}
          </Typography>
          {bankroll && (
            <TokenIcon
              size={20}
              token={bankroll?.tokenSymbol}
              alt={bankroll?.tokenName}
            />
          )}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        gap={1}
        alignItems="end"
        paddingTop={1}
        justifyContent="space-between"
      >
        <Typography variant="caption">
          {t('components.walletDropdown.sessionBalanceRow.helperText')}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        gap={1}
        alignItems="flex-start"
        paddingTop="3px"
        justifyContent="space-between"
      >
        <Stack
          direction="column"
          gap={1}
          alignItems="stretch"
          alignContent="space-between"
          width="100%"
        >
          <TextField
            disabled={isLoading}
            type="number"
            autoComplete="off"
            name="amount"
            color="success"
            variant="outlined"
            placeholder={t('components.walletDropdown.sessionBalanceRow.placeholder')}
            size="small"
            value={inputValue}
            onChange={({ target: { value } }) => {
              handleInputValue(value);
            }}
            InputProps={{ sx: { borderRadius: '12px', height: '48px' } }}
            sx={{
              borderColor: theme.app?.primaryAccent,
              bgcolor: theme.app?.elevation1,
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: theme.app?.primaryContent,
              },
              input: {
                color: theme.app?.primaryContent,
                borderColor: theme.app?.primaryAccent,
                borderRadius: '12px',
              },
              borderRadius: '12px',
              height: '48px',
            }}
          />
          <Stack
            direction="row"
            gap="12px"
            alignItems="center"
            justifyContent="flex-start"
          >
            <AddButton
              variant="contained"
              disabled={isLoading}
              text={t('components.walletDropdown.sessionBalanceRow.addButton1')}
              onClick={() => handleInputValue(addToInput(10))}
            />
            <AddButton
              variant="contained"
              disabled={isLoading}
              text={t('components.walletDropdown.sessionBalanceRow.addButton2')}
              onClick={() => handleInputValue(addToInput(50))}
            />
            <AddButton
              variant="contained"
              disabled={isLoading}
              text={t('components.walletDropdown.sessionBalanceRow.addButton3')}
              onClick={() => handleInputValue(walletBalance)}
            />
          </Stack>
        </Stack>

        <CtaButton
          text={t('components.walletDropdown.sessionBalanceRow.addFundsButton')}
          loading={isLoading}
          disabled={!!error || !!inputError}
          onClick={handleConfirm}
        />
      </Stack>
    </Stack>
  );
};

const CashOutRow = ({ address }: { address: string }) => {
  const t = useTranslations();
  const { balanceIsUpdated, user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<undefined | Error>(undefined);
  const { bankroll } = useBankroll();
  const [fund, setFund] = useState(user?.funds?.[0]);
  const theme = useTheme();
  const isGtMd = useMediaQuery(theme.breakpoints.down('md'));

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

  const handleCashOut = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    setIsLoading(true);
    const bearerToken = getBearerToken();

    const body = {
      accountFundId: fund?._id,
    };
    console.log('handleCashOut body', body);
    const result = await fetch(`${baseUrl}/accounts/withdraw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: bearerToken ? `Bearer ${bearerToken} siwe` : '',
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
    if (result.error) {
      setError(result?.error);
    }
    await balanceIsUpdated();
    setIsLoading(false);
  };

  return (
    <Stack direction="column" sx={{ mt: 3 }}>
      <Typography variant="body2" fontWeight={700}>
        {t('components.walletDropdown.cashOutRow.title')}
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        gap={1}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        mt="2px"
        justifyContent="space-between"
      >
        <Typography variant="caption" mt="6px" sx={{ width: { xs: 'auto', md: '67%' } }}>
          {t('components.walletDropdown.cashOutRow.description')}
        </Typography>
        <CtaButton
          variant="contained"
          color="secondary"
          sx={{
            bgcolor: 'background.default',
            ':hover': {
              bgcolor: '#131313',
            },
          }}
          text={t('components.walletDropdown.cashOutRow.button')}
          loading={isLoading}
          fullWidth={isGtMd}
          onClick={handleCashOut}
        />
      </Stack>
      {error && (
        <Typography variant="caption" mt="6px" color="error">
          {error?.message}
        </Typography>
      )}
    </Stack>
  );
};

const WalletDropdown = ({
  address,
  walletBalance,
  sessionBalance,
}: {
  address: string;
  walletBalance: string;
  sessionBalance: string;
}) => {
  const theme = useTheme();

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
      <SessionBalanceRow sessionBalance={sessionBalance} walletBalance={walletBalance} />
      <CashOutRow address={address} />
      <Divider sx={{ borderColor: '#FFFFFF1A', mt: '32px', mb: '8px' }} />
      <BalanceRow balance={walletBalance} address={address} />
    </Stack>
  );
};

export default WalletDropdown;
