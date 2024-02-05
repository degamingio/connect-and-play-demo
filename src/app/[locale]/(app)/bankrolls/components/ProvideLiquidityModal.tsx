import { usePreparedContractWriteFlow } from '@/hooks/useContractWriteFlow';
import { useBankroll } from '@/state/BankrollContext';
import { BankrollType } from '@/types';
import { formatBalance } from '@/utils/wallet.utils';
import { CircularProgress, TextField, useTheme } from '@mui/material';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { useAccount, useContractRead } from 'wagmi';

const AllowanceText = ({
  allowance,
  bankroll,
}: {
  allowance?: bigint;
  bankroll?: BankrollType;
}) => {
  const _allowance = formatBalance(allowance || 0n, bankroll?.tokenDecimals);
  return <Typography sx={{ marginTop: 1 }}>Allowance: ${Number(_allowance)}</Typography>;
};

const ApproveButton = ({
  amount,
  bankroll,
}: {
  amount: bigint;
  bankroll?: BankrollType;
}) => {
  const { write, isLoading } = usePreparedContractWriteFlow({
    abi: bankroll?.tokenAbi,
    address: bankroll?.tokenAddress as Address,
    functionName: 'approve',
    args: [bankroll?.contractAddress, amount],
    enabled: !!bankroll,
  });

  return (
    <>
      <Button
        size="large"
        sx={{ marginTop: 4, width: 250, borderRadius: 5 }}
        onClick={(e) => {
          e.stopPropagation();
          write?.();
        }}
      >
        {' '}
        {isLoading ? (
          <CircularProgress
            sx={{ mr: 1 }}
            // color="white"
            size={30}
          />
        ) : null}
        Approve
      </Button>
    </>
  );
};

const ProvideLiquidityButton = ({
  amount,
  bankroll,
  setOpen,
}: {
  amount: number;
  bankroll?: BankrollType;
  setOpen: (open: boolean) => void;
}) => {
  const _amount = BigInt(amount * 10 ** (bankroll?.tokenDecimals || 0));

  const { write, isLoading } = usePreparedContractWriteFlow({
    abi: bankroll?.contractAbi,
    address: bankroll?.contractAddress as Address,
    functionName: 'depositFunds',
    args: [_amount],
  });
  return (
    <Button
      variant="contained"
      size="large"
      sx={{ marginTop: 4, width: 250, borderRadius: 5 }}
      onClick={(e) => {
        e.stopPropagation();
        if (amount == 0) return;
        write?.();
        setOpen(false);
      }}
    >
      Provide Liquidity
    </Button>
  );
};

const SubmitButton = ({
  accountAddress,
  bankroll,
  amount,
  setAllowance,
  setOpen,
}: {
  amount: number;
  bankroll?: BankrollType;
  accountAddress: Address;
  setAllowance: (val: bigint) => void;
  setOpen: (open: boolean) => void;
}) => {
  const _amount = BigInt(amount * 10 ** (bankroll?.tokenDecimals || 0));
  const { data } = useContractRead({
    abi: bankroll?.tokenAbi,
    address: bankroll?.tokenAddress as Address,
    functionName: 'allowance',
    args: [accountAddress, bankroll?.contractAddress],
    watch: true,
    enabled: !!bankroll,
  });

  useEffect(() => setAllowance(data as unknown as bigint), [data]);

  return (data as unknown as bigint) < _amount ? (
    <ApproveButton bankroll={bankroll} amount={_amount} />
  ) : (
    <ProvideLiquidityButton setOpen={setOpen} amount={amount} bankroll={bankroll} />
  );
};

const MintTestTokens = ({
  bankroll,
  accountAddress,
}: {
  bankroll?: BankrollType;
  accountAddress: Address;
}) => {
  const { write, isLoading } = usePreparedContractWriteFlow({
    abi: bankroll?.tokenAbi,
    address: bankroll?.tokenAddress as Address,
    functionName: 'mint',
    args: [accountAddress, 1000 * (bankroll?.tokenDecimals || 0)],
  });

  return (
    <Box sx={{ marginTop: 6 }}>
      <hr />
      <Typography sx={{ marginTop: 3 }} variant="h6" component="h6">
        Test environment
      </Typography>
      <Typography>
        You can mint test tokens to your wallet to test the liquidity providing feature
      </Typography>
      <Button
        size="large"
        sx={{ marginTop: 1 }}
        onClick={(e) => {
          e.stopPropagation();
          write?.();
        }}
      >
        Mint test tokens
      </Button>
    </Box>
  );
};

const ProvideLiquidityModal = () => {
  const [allowance, setAllowance] = useState(0n);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const account = useAccount();
  const theme = useTheme();
  const { bankroll } = useBankroll();
  const sm = useMediaQuery('(max-width:450px)');
  const [input, setInput] = useState(0);

  return (
    <Box>
      <Button
        color="primary"
        size="large"
        sx={{ borderRadius: 5 }}
        variant="contained"
        onClick={handleOpen}
      >
        {sm ? 'Deposit' : 'Provide liquidity'}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: theme.app?.elevation3,
              border: theme.app?.primaryAccent,
              boxShadow: 24,
              p: 4,
              borderRadius: 5,
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{ marginBottom: 3 }}
              id="transition-modal-title"
              variant="h5"
              component="h5"
            >
              {`Provide $${bankroll?.tokenSymbol}`}
            </Typography>
            <Alert variant="filled" severity="warning">
              Feature in beta, proceed at your own risk
            </Alert>
            <Box sx={{ marginTop: 3 }}>
              <TextField
                onClick={(e) => e.stopPropagation()}
                onChange={(event) => setInput(Number(event.target.value))}
                type="number"
                autoComplete="off"
                placeholder="Amount"
                InputProps={{ sx: { borderRadius: '12px', height: '48px' } }}
                sx={{
                  width: 250,
                  borderColor: theme.app?.primaryAccent,
                  bgcolor: theme.app?.elevation1,
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: theme.app?.primaryContent,
                  },
                  input: {
                    color: theme.app?.primaryContent,
                    borderColor: theme.app?.primaryAccent,
                    borderRadius: '12px',
                    textAlign: 'center',
                    // fontWeight: 'bold',
                    // fontSize: 20,
                  },
                  borderRadius: '12px',
                  height: '48px',
                }}
              />{' '}
              <AllowanceText allowance={allowance} bankroll={bankroll} />
              <SubmitButton
                setOpen={setOpen}
                setAllowance={setAllowance}
                accountAddress={account.address!}
                bankroll={bankroll}
                amount={input}
              />
            </Box>
            {process.env.NEXT_PUBLIC_ENVIRONMENT !== 'prod' && (
              <MintTestTokens accountAddress={account.address!} bankroll={bankroll} />
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ProvideLiquidityModal;
