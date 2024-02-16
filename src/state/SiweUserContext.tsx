import { AppConfig } from '@/config/AppConfig';
import {
  getBearerToken,
  removeBearerToken,
  setBearerToken,
  validateBearerToken,
} from '@/libs/bearerToken';
import { useTranslations } from 'next-intl';
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Address, Connector } from 'wagmi';
import { useAccount, useNetwork } from 'wagmi';

export enum SiweStatus {
  'initial',
  'authenticated',
  'unauthenticated',
  'loading',
}

type SiweUserContextProps = {
  status: SiweStatus;
  ensureAuthenticated: () => Promise<boolean>;
};

const SiweUserContext = createContext<SiweUserContextProps>({
  status: SiweStatus.initial,
  ensureAuthenticated: async () => false,
});

const baseUrl = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL + '/auth'
  : '';

const loginFlow = async (
  connector: Connector,
  address: Address,
  chainId: number,
  statement?: string,
) => {
  try {
    const { nonce } = await fetch(`${baseUrl}/nonce?address=${address}`).then((res) =>
      res.json(),
    );

    const { SiweMessage } = await import('siwe');

    const message = new SiweMessage({
      domain: window.location.host,
      address,
      statement,
      uri: window.location.origin,
      version: '1',
      chainId,
      nonce,
    });

    const preparedMessage = message.prepareMessage();
    const signer = await connector?.getWalletClient();
    const signature = await signer.signMessage({ message: preparedMessage });

    const sessionRes = await fetch(`${baseUrl}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        signature,
        operatorCode: AppConfig.operatorCode,
      }),
    }).then((res) => res.json());

    return sessionRes;
  } catch (e: any) {
    if (e && e.code === 4001) {
      console.error('User denied sign message, logout');
    }
    return false;
  }
};

export const SiweUserProvider = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();
  const [status, setStatus] = useState<SiweStatus>(SiweStatus.initial);
  const { address, connector, status: accountStatus } = useAccount();
  const addressRef = useRef(address);
  const { chain } = useNetwork();

  const getAuthStatus = useCallback(async () => {
    const token = getBearerToken();

    if (validateBearerToken(token, address)) {
      const valid = await fetch(`${baseUrl}/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      }).then((res) => res.json());

      if (valid) return SiweStatus.authenticated;
      removeBearerToken();
    }

    return SiweStatus.unauthenticated;
  }, [address]);

  const handleLogin = useCallback(async () => {
    setStatus(SiweStatus.loading);

    const bearerToken = await loginFlow(
      connector!,
      address!,
      chain?.id!,
      t('login.message'),
    );

    if (!validateBearerToken(bearerToken, address!)) {
      setStatus(SiweStatus.unauthenticated);
      return SiweStatus.unauthenticated;
    }

    setBearerToken(bearerToken);
    setStatus(SiweStatus.authenticated);
    return SiweStatus.authenticated;
  }, [address, connector, chain]);

  const handleLogout = useCallback(async () => {
    setStatus(SiweStatus.unauthenticated);
    removeBearerToken();
  }, []);

  // Keep track of address changes, logout if user switches wallet
  useEffect(() => {
    if (addressRef.current && addressRef.current !== address) handleLogout();
    addressRef.current = address;
  }, [address, handleLogout]);

  // Initial sync after refresh/'reconnecting'
  useEffect(() => {
    if (accountStatus === 'connected') getAuthStatus().then(setStatus);
  }, [getAuthStatus, accountStatus]);

  const ensureAuthenticated = useCallback(async () => {
    const authStatus = await getAuthStatus();
    if (authStatus === SiweStatus.authenticated) return true;
    const success = (await handleLogin()) === SiweStatus.authenticated;

    return success;
  }, [getAuthStatus, handleLogin]);

  const value = useMemo(
    () => ({ status, ensureAuthenticated }),
    [status, ensureAuthenticated],
  );

  return <SiweUserContext.Provider value={value}>{children}</SiweUserContext.Provider>;
};

export default SiweUserContext;
