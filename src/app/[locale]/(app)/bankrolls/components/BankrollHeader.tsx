import { useBankroll } from '@/state/BankrollContext';
import SiweUserContext, { SiweStatus } from '@/state/SiweUserContext';
import { formatBankrollBalance } from '@/utils/wallet.utils';
import { Box, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { Address } from 'viem';
import { useAccount, useContractRead } from 'wagmi';
import ProvideLiquidityModal from './ProvideLiquidityModal';
import WithdrawLiquidity from './WithdrawLiquidity';

const BankrollHeader = () => {
  const { bankroll } = useBankroll();
  const { address } = useAccount();
  const { status: siweStatus } = useContext(SiweUserContext);
  const { data } = useContractRead({
    abi: bankroll?.tokenAbi,
    address: bankroll?.tokenAddress as Address,
    functionName: 'balanceOf',
    args: [bankroll?.contractAddress],
    watch: true,
  });

  const balance = formatBankrollBalance(
    (data as unknown as bigint) || 0n,
    bankroll?.tokenDecimals,
  );

  return (
    <Box display={{ xs: 'block', sm: 'flex' }} sx={{ marginTop: 2, marginBottom: 2 }}>
      <Stack direction="row" sx={{ flexGrow: 2 }}>
        <Typography color="white" fontSize={42} fontWeight="bold">
          ${balance}
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ height: 43, marginTop: 2 }}>
        <WithdrawLiquidity />
        {address && siweStatus === SiweStatus.authenticated && <ProvideLiquidityModal />}
      </Stack>
    </Box>
  );
};

export default BankrollHeader;
