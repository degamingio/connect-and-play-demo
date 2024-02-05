'use client';

import { BankrollType } from '@/types';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useOperator } from './OperatorContext';

type BankrollContextProps = {
  bankroll?: BankrollType;
  setBankroll: (bankroll: BankrollType) => void;
};

const BankrollContext = createContext<BankrollContextProps>({
  bankroll: undefined,
  setBankroll: (_) => {},
});

const PREVIOUS_BANKROLL_ADDRESS = 'previousBankrollAddress';

const getPreviousBankrollAddress = () =>
  localStorage.getItem(PREVIOUS_BANKROLL_ADDRESS) || undefined;

export const BankrollProvider = ({ children }: { children: React.ReactNode }) => {
  const { operator } = useOperator();
  const [bankroll, setBankroll] = useState<BankrollType | undefined>(undefined);

  useEffect(() => {
    if (bankroll) return;
    if (!operator) return;

    const previousBankrollAddress = getPreviousBankrollAddress();

    const newBankroll =
      operator.bankrolls.find((b) => b.contractAddress === previousBankrollAddress) ||
      operator.bankrolls[0];

    if (newBankroll?.contractAddress !== previousBankrollAddress)
      localStorage.removeItem(PREVIOUS_BANKROLL_ADDRESS);

    setBankroll(newBankroll);
  }, [setBankroll, operator]);

  useEffect(() => {
    if (!bankroll) return;
    localStorage.setItem(PREVIOUS_BANKROLL_ADDRESS, bankroll.contractAddress);
  }, [bankroll]);

  const value = useMemo(
    () => ({
      bankroll,
      allBankrolls: operator?.bankrolls,
      setBankroll,
    }),
    [bankroll, setBankroll, operator?.bankrolls],
  );

  return <BankrollContext.Provider value={value}>{children}</BankrollContext.Provider>;
};

export const useBankroll = () => useContext(BankrollContext);

export default BankrollContext;
