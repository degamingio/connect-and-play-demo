'use client';

import { AppConfig } from '@/config/AppConfig';
import { OperatorType } from '@/types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type OperatorContextProps = {
  operator?: OperatorType;
  loading: boolean;
  setOperator: (s: OperatorType | undefined) => void;
};

const OperatorContext = createContext<OperatorContextProps>({
  operator: undefined,
  loading: false,
  setOperator: (_) => {},
});

export const OperatorProvider = ({ children }: { children: React.ReactNode }) => {
  const [operator, setOperator] = useState<OperatorType | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

  useEffect(() => {
    if (loading) return;
    setLoading(true);
    fetch(`${baseUrl}/operators/${AppConfig.operatorCode}`)
      .then((res) => res.json())
      .then((o) => {
        setOperator(o);
        setLoading(false);
      });
  }, [setOperator]);

  const value = useMemo(
    () => ({
      operator,
      setOperator,
      loading,
    }),
    [operator, setOperator],
  );

  return <OperatorContext.Provider value={value}>{children}</OperatorContext.Provider>;
};

export const useOperator = () => useContext(OperatorContext);

export default OperatorContext;
