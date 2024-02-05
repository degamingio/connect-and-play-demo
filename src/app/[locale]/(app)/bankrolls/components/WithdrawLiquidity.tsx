import { usePreparedContractWriteFlow } from '@/hooks/useContractWriteFlow';
import { useBankroll } from '@/state/BankrollContext';
import { formatBalance } from '@/utils/wallet.utils';
import { Button } from '@mui/material';
import { Address } from 'viem';
import { useAccount, useContractRead } from 'wagmi';

const WithdrawLiquidity = () => {
  const { bankroll } = useBankroll();
  const account = useAccount();

  const { data } = useContractRead({
    abi: bankroll?.contractAbi,
    address: bankroll?.contractAddress as Address,
    functionName: 'sharesOf',
    args: [account.address],
    watch: true,
  });
  const shares = formatBalance(
    (data as unknown as bigint) || 0n,
    bankroll?.tokenDecimals,
  );

  const { write } = usePreparedContractWriteFlow({
    abi: bankroll?.contractAbi,
    address: bankroll?.contractAddress as Address,
    functionName: 'withdrawAll',
  });

  return Number(shares) > 0 ? (
    <Button
      color="primary"
      size="large"
      sx={{
        borderRadius: 5,
        height: 42,
        marginRight: 3,
        paddingLeft: 3,
        paddingRight: 3,
      }}
      variant="text"
      onClick={(e) => {
        write?.();
      }}
    >
      Withdraw all
    </Button>
  ) : null;
};

export default WithdrawLiquidity;
