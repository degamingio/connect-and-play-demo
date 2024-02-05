'use client'

import { useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';

import {
  GAMEPLAY_LOGS_QUERY,
  GAMEPLAY_LOGS_SUBSCRIBE,
} from '@/graphql/livebets/LiveBetsQuery';

export const useGameplayLogs = ({
  playerAddress,
  casinoOperatorAddress,
  gameId,
  limit = 15,
  pause = false,
}: {
  playerAddress?: string;
  casinoOperatorAddress?: string;
  gameId?: string;
  limit?: number;
  pause?: boolean;
}) => {
  const { subscribeToMore, data, loading } = useQuery(GAMEPLAY_LOGS_QUERY, {
    variables: {
      playerAddress,
      gameId,
      casinoOperatorAddress,
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (pause) return () => undefined;

    // returns unsubscribe function
    return subscribeToMore({
      document: GAMEPLAY_LOGS_SUBSCRIBE,
      variables: {
        playerAddress,
        gameId,
        casinoOperatorAddress,
      },
      updateQuery: (prev, { subscriptionData }) => ({
        gameplayLogs: !subscriptionData.data
          ? prev.gameplayLogs
          : [subscriptionData.data.gameplayLogAdded, ...(prev?.gameplayLogs || [])],
      }),
    });
  }, [subscribeToMore, playerAddress, gameId, casinoOperatorAddress, pause]);

  const value = useMemo(
    () => ({
      data: data?.gameplayLogs?.slice(0, limit) || [],
      loading,
    }),
    [data, loading, limit],
  );

  return value;
};
