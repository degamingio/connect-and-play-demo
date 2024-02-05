import { gql } from '@apollo/client';

export const GAMEPLAY_LOGS_QUERY = gql`
  query GetGameplayLogs(
    $gameId: String
    $playerAddress: String
    $casinoOperatorAddress: String
  ) {
    gameplayLogs(
      gameId: $gameId
      playerAddress: $playerAddress
      casinoOperatorAddress: $casinoOperatorAddress
    ) {
      _id
      gameId
      betAmount
      outcome
      timestamp
      winningAmount
      hash
      playerAddress
      name
      casinoOperatorAddress
      chainId
      gameName
      token
      payoutAmount
    }
  }
`;

export const LEADERBOARD_QUERY = gql`
  query GetLeaderboard {
    leaderboard {
      name
      address
      volume
    }
  }
`;

export const GAMEPLAY_LOGS_SUBSCRIBE = gql`
  subscription gameplayLogAdded(
    $gameId: String
    $playerAddress: String
    $casinoOperatorAddress: String
  ) {
    gameplayLogAdded(
      gameId: $gameId
      playerAddress: $playerAddress
      casinoOperatorAddress: $casinoOperatorAddress
    ) {
      _id
      gameId
      betAmount
      outcome
      timestamp
      winningAmount
      hash
      playerAddress
      name
      casinoOperatorAddress
      chainId
      gameName
      token
      payoutAmount
    }
  }
`;
