'use client';

import {
  GAMEPLAY_LOGS_QUERY,
  GAMEPLAY_LOGS_SUBSCRIBE,
} from '@/graphql/livebets/LiveBetsQuery';
import { useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';

export const useGameplayLogs = ({
  playerAddress,
  operatorCode,
  gameId,
  limit = 15,
  pause = false,
}: {
  playerAddress?: string;
  operatorCode?: string;
  gameId?: string;
  limit?: number;
  pause?: boolean;
}) => {
  const { subscribeToMore, data, loading } = useQuery(GAMEPLAY_LOGS_QUERY, {
    variables: {
      playerAddress,
      gameId,
      operatorCode,
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
        operatorCode,
      },
      updateQuery: (prev, { subscriptionData }) => ({
        gameplayLogs: !subscriptionData.data
          ? prev.gameplayLogs
          : [subscriptionData.data.gameplayLogAdded, ...(prev?.gameplayLogs || [])],
      }),
    });
  }, [subscribeToMore, playerAddress, gameId, operatorCode, pause]);

  const value = useMemo(
    () => ({
      data: data?.gameplayLogs?.slice(0, limit) || [],
      loading,
    }),
    [data, loading, limit],
  );

  return value;
};
