import { gql } from '@apollo/client';

export const GAMEPLAY_LOGS_QUERY = gql`
  query GetGameplayLogs($gameId: String, $playerAddress: String, $operatorCode: String) {
    gameplayLogs(
      gameId: $gameId
      playerAddress: $playerAddress
      operatorCode: $operatorCode
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
      operatorCode
      chainId
      gameName
      token
      payoutAmount
    }
  }
`;

export const LEADERBOARD_QUERY = gql`
  query GetLeaderboard($operatorCode: String!) {
    leaderboard(operatorCode: $operatorCode) {
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
    $operatorCode: String
  ) {
    gameplayLogAdded(
      gameId: $gameId
      playerAddress: $playerAddress
      operatorCode: $operatorCode
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
      operatorCode
      chainId
      gameName
      token
      payoutAmount
    }
  }
`;
