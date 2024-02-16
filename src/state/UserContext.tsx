import { AppConfig } from '@/config/AppConfig';
import { UPDATE_USER_NAME } from '@/graphql/users/UserMutation';
import { QUERY_USER_BY_WALLET_AND_OPERATOR_CODE } from '@/graphql/users/UserQuery';
import { useMutation, useQuery } from '@apollo/client';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import SiweUserContext, { SiweStatus } from './SiweUserContext';

export interface IAccountFund {
  _id: string;
  accountId: string;
  targetAddress: string;
  tokenAddress: string;
  chainId: number;
  balance: number;
  deposit: number;
}

export interface IUser {
  _id: string;
  lastLoginAt?: Date;
  name?: string;
  walletAddress?: string;
  funds: IAccountFund[];
}

type UserContextProps = {
  user?: IUser;
  isLoading?: boolean;
  error?: Error;
  balanceIsUpdating: boolean;
  // isMe?: boolean;
  updateUser: (newUser: Partial<IUser>) => Promise<void>;
  balanceIsUpdated: () => Promise<void>;
};

export const UserContext = createContext<UserContextProps>({
  balanceIsUpdating: false,
  updateUser: async () => {},
  balanceIsUpdated: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [balanceIsUpdating, setBalanceIsUpdating] = useState(false);
  const { status: siweStatus, ensureAuthenticated } = useContext(SiweUserContext);
  const { address, connector, status: accountStatus } = useAccount();
  const {
    loading: isLoading,
    error,
    data,
    refetch: refetchUserByWalletAndOperatorCode,
  } = useQuery(QUERY_USER_BY_WALLET_AND_OPERATOR_CODE, {
    variables: {
      walletAddress: address,
      operatorCode: AppConfig.operatorCode,
    },
    skip: !address || siweStatus !== SiweStatus.authenticated,
    fetchPolicy: 'network-only',
  });

  const [updateUserMutation] = useMutation(UPDATE_USER_NAME);

  const updateUser = useCallback(
    async ({ _id, name }: Partial<IUser>) => {
      await updateUserMutation({
        variables: {
          walletAddress: address,
          accountId: value.user._id || _id,
          name,
        },
        onError: (err) => console.error(err),
      });
    },
    [updateUserMutation, address],
  );

  const balanceIsUpdated = useCallback(async () => {
    setBalanceIsUpdating(true);
    await new Promise((res) => setTimeout(res, 400));
    refetchUserByWalletAndOperatorCode();
    setBalanceIsUpdating(false);
  }, [updateUserMutation, address]);

  const value = useMemo(
    () => ({
      user: {
        ...(data?.userByWalletAddressAndOperatorCode || {}),
        walletAddress: address,
      },
      isLoading,
      error,
      updateUser,
      balanceIsUpdated,
      balanceIsUpdating,
    }),
    [data, isLoading, error, updateUser, balanceIsUpdated, address, balanceIsUpdating],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
