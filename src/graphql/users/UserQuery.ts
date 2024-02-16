import { gql } from '@apollo/client';

export const QUERY_USER_BY_WALLET_AND_OPERATOR_CODE = gql`
  query GetUserByWalletAddressAndOperatorCode(
    $walletAddress: String!
    $operatorCode: String!
  ) {
    userByWalletAddressAndOperatorCode(
      walletAddress: $walletAddress
      operatorCode: $operatorCode
    ) {
      _id
      walletAddress
      name
      operatorCode
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
  query UserStats($walletAddress: String!, $operatorCode: String!) {
    userStats(walletAddress: $walletAddress, operatorCode: $operatorCode) {
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
