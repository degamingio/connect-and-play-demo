import { gql } from '@apollo/client';

export const QUERY_USER_BY_WALLET_AND_OPERATOR = gql`
  query GetUserByWalletAddressAndOperator($walletAddress: String!, $operator: String!) {
    userByWalletAddressAndOperator(walletAddress: $walletAddress, operator: $operator) {
      _id
      walletAddress
      name
      operator
      lastLoginAt
      funds {
        _id
        accountId
        targetAddress
        tokenAddress
        chainId
        balance
        deposit
      }
    }
  }
`;

export const QUERY_USER_FUND_BY_ID = gql`
  query GetUserFundById($fundId: ObjectId!) {
    accountFundById(_id: $fundId) {
      _id
      accountId
      targetAddress
      tokenAddress
      chainId
      balance
      deposit
    }
  }
`;

export const QUERY_USER_STATISTICS = gql`
  query UserStats($walletAddress: String!, $operator: String!) {
    userStats(walletAddress: $walletAddress, operator: $operator) {
      wagered
      totalBets
      totalWins
      totalLosses
      highestWin
      highestMultiplier
      favoriteGame
      grossProfit
      netProfit
    }
  }
`;

export const USER_FUND_UPDATED_SUBSCRIBE = gql`
  subscription userFundUpdated($fundId: ObjectId!) {
    accountFundUpdated(_id: $fundId) {
      _id
      accountId
      targetAddress
      tokenAddress
      chainId
      balance
      deposit
    }
  }
`;
