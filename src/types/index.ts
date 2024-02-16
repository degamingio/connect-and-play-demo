import { Address } from 'viem';

type OperatorType = {
  name: string;
  code: string;
  managerWalletAddress: Address;
  bankrolls: BankrollType[];
  createdAt: Date;
};

type NetworkType = {
  id: string;
  chainId: number;
  name: string;
  bankrolls: BankrollType[];
};

type BankrollType = {
  bankrollType: string;
  tokenName: string;
  tokenSymbol: string;
  contractAddress: Address;
  tokenAddress: Address;
  tokenDecimals: number;
  chainId: number;
  rpcUrl: string;
  tokenAbi: any;
  contractAbi: any;
};

export type { OperatorType, NetworkType, BankrollType };
