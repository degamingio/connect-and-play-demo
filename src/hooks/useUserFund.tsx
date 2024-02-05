'use client';

import {
  QUERY_USER_FUND_BY_ID,
  USER_FUND_UPDATED_SUBSCRIBE,
} from '@/graphql/users/UserQuery';
import { useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';

export const useUserFund = ({
  fundId,
  limit = 15,
  pause = false,
}: {
  fundId?: string;
  limit?: number;
  pause?: boolean;
}) => {
  const { subscribeToMore, data, loading } = useQuery(QUERY_USER_FUND_BY_ID, {
    variables: {
      fundId,
    },
    fetchPolicy: 'network-only',
    skip: !fundId,
  });

  useEffect(() => {
    if (pause) return () => undefined;

    // returns unsubscribe function
    return subscribeToMore({
      document: USER_FUND_UPDATED_SUBSCRIBE,
      variables: {
        fundId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        const accountFundById = subscriptionData?.data
          ? prev.accountFundById
          : subscriptionData?.data.accountFundUpdated;
        return {
          accountFundById,
        };
      },
    });
  }, [subscribeToMore, fundId, pause]);

  const value = useMemo(
    () => ({
      data: data?.accountFundById,
      loading,
    }),
    [data, loading, limit],
  );

  return value;
};
