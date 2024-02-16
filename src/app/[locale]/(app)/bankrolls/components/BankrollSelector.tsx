import TokenIcon from '@/components/General/CurrencySymbol';
import { AppConfig } from '@/config/AppConfig';
import { useBankroll } from '@/state/BankrollContext';
import { useOperator } from '@/state/OperatorContext';
import { BankrollType, NetworkType } from '@/types';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';

const Tokens = ({ bankrolls }: { bankrolls: Array<BankrollType> }) => {
  return (
    <Box>
      {bankrolls.map((token) => (
        <Token key={token.contractAddress} token={token} />
      ))}
    </Box>
  );
};

const Token = ({ token }: { token: BankrollType }) => {
  const { bankroll, setBankroll } = useBankroll();

  return (
    <Button
      variant={bankroll?.contractAddress === token.contractAddress ? 'outlined' : 'text'}
      sx={{
        borderRadius: 10,
        textTransform: 'none',
        marginRight: 1,
      }}
      onClick={() => setBankroll(token)}
    >
      {token && (
        <TokenIcon
          token={token.tokenSymbol}
          alt={token.tokenName}
          size={24}
          style={{ marginRight: 5 }}
        />
      )}
      &nbsp;
      {/* <Typography color="white" fontSize={20} sx={{ lineHeight: 1.3 }}>Tether</Typography>&nbsp; */}
      <Typography
        color="lightGray"
        fontSize={20}
        fontWeight={'bold'}
        sx={{ lineHeight: 1.3 }}
      >
        {token?.tokenSymbol}
      </Typography>
    </Button>
  );
};

const BankrollSelector = () => {
  const { operator } = useOperator();

  // Need operator to be loaded
  if (!operator) return null;

  const bankrollsByChainId = operator?.bankrolls?.reduce(
    (obj, b) => ({ ...obj, [b.chainId]: [b, ...(obj[b.chainId] || [])] }),
    {} as { [key: number]: BankrollType[] },
  );

  const allNetwork = {
    id: 'all',
    chainId: 0,
    name: 'All',
    bankrolls: Object.values(bankrollsByChainId!).flat(),
  };

  const networks = Object.keys(bankrollsByChainId!).reduce(
    (arr, chainIdKey) => {
      return [
        ...arr,
        {
          id: chainIdKey,
          chainId: parseInt(chainIdKey),
          name:
            AppConfig.supportedChains.find((sc) => sc?.chain?.id === parseInt(chainIdKey))
              ?.chain?.name || 'Unknown',
          bankrolls: bankrollsByChainId![parseInt(chainIdKey)],
        },
      ] as NetworkType[];
    },
    [allNetwork],
  );

  const Networks = () => {
    const [selected, setSelected] = useState<NetworkType>(networks[0]!);

    const NetworkButton = ({ network }: { network: NetworkType }) => {
      return (
        <Button
          sx={{
            borderRadius: 20,
            height: 30,
          }}
          variant={selected?.id == network?.id ? 'outlined' : 'text'}
          onClick={() => setSelected(network)}
        >
          {network.name}
        </Button>
      );
    };

    return (
      <Box>
        <Box flexDirection="column" sx={{ display: 'flex', marginBottom: 2 }}>
          <Stack direction="row" spacing={1} sx={{ display: 'flex' }}>
            {networks.map((network) => (
              <NetworkButton key={network.id} network={network} />
            ))}
          </Stack>
        </Box>
        <Tokens bankrolls={selected.bankrolls} />
      </Box>
    );
  };

  return operator ? <Networks /> : null;
};

export default BankrollSelector;
