import { useBankroll } from '@/state/BankrollContext';
import { formatBalance, formatBankrollBalance } from '@/utils/wallet.utils';
import { Box, Stack, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Address } from 'viem';
import { useAccount, useContractRead } from 'wagmi';

const LiquidityProvider = () => {
  const { bankroll } = useBankroll();
  const account = useAccount();
  const sm = useMediaQuery('(max-width:450px)');

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

  const Title = ({ text }: { text: string }) => {
    return (
      <Typography fontSize={16} sx={{ color: 'lightgray' }}>
        {text}
      </Typography>
    );
  };

  const Text = ({ text, color }: { text: string; color: string }) => {
    return (
      <Typography fontSize={22} sx={{ color: color }} fontWeight="bold">
        {text}
      </Typography>
    );
  };

  const Item = ({
    title,
    text,
    subtitle,
    color,
  }: {
    title: string;
    text: string;
    subtitle?: string;
    color?: string;
  }) => {
    return (
      <Box sx={{ marginBottom: 0 }}>
        <Title text={title} />
        <Text text={text} color={color ?? 'white'} />
      </Box>
    );
  };

  const InvestmentCurrentValue = () => {
    const { data } = useContractRead({
      abi: bankroll?.contractAbi,
      address: bankroll?.contractAddress as Address,
      functionName: 'getInvestorAvailableAmount',
      args: [account.address],
      watch: true,
    });
    const balance = formatBankrollBalance(
      (data as unknown as bigint) || 0n,
      bankroll?.tokenDecimals,
    );
    return <Item title="Current value" text={`$${balance}`} />;
  };

  const Deposited = () => {
    const { data } = useContractRead({
      abi: bankroll?.contractAbi,
      address: bankroll?.contractAddress as Address,
      functionName: 'depositOf',
      args: [account.address],
      watch: true,
    });
    const balance = formatBankrollBalance(
      (data as unknown as bigint) || 0n,
      bankroll?.tokenDecimals,
    );
    return <Item title="Deposited" text={`$${balance}`} />;
  };

  const Investment = () => {
    const { data } = useContractRead({
      abi: bankroll?.contractAbi,
      address: bankroll?.contractAddress as Address,
      functionName: 'getLpValue',
      args: [account.address],
      watch: true,
    });
    const balance = formatBankrollBalance(
      (data as unknown as bigint) || 0n,
      bankroll?.tokenDecimals,
    );
    return <Item title="Current" text={`$${balance}`} />;
  };

  const Stake = () => {
    const { data } = useContractRead({
      abi: bankroll?.contractAbi,
      address: bankroll?.contractAddress as Address,
      functionName: 'getLpStake',
      args: [account.address],
      watch: true,
    });

    return <Item title="Stake" text={`${Number(data) / 100}%`} />;
  };

  const LpFee = () => {
    const { data } = useContractRead({
      abi: bankroll?.contractAbi,
      address: bankroll?.contractAddress as Address,
      functionName: 'lpFee',
      watch: true,
    });

    return <Item title="Bankroll profit" text={`${Number(data) / 100}%`} />;
  };

  const Profit = () => {
    const { data } = useContractRead({
      abi: bankroll?.contractAbi,
      address: bankroll?.contractAddress as Address,
      functionName: 'getLpProfit',
      args: [account.address],
      watch: true,
    });
    const balance = formatBankrollBalance(
      (data as unknown as bigint) || 0n,
      bankroll?.tokenDecimals,
    );

    if (balance == '-0') return null;

    const color = balance.includes('-') ? 'rgb(253, 64, 64)' : 'rgb(39, 174, 96)';

    return <Item title="My profit" text={`$${balance}`} color={color} />;
  };

  return Number(shares) > 0 ? (
    <Box
      flexDirection="column"
      sx={{
        borderRadius: 5,
        flexGrow: 1,
        padding: sm ? 2 : 3,
        backgroundColor: 'rgba(255,255,255,0.1)',
        overflowX: 'hidden',
      }}
    >
      <Stack direction="row" gap={7}>
        {sm ? null : <Profit />}
        <Investment />
        <Deposited />
        <Stake />
        {sm ? null : <LpFee />}
      </Stack>
    </Box>
  ) : null;
};

export default LiquidityProvider;
