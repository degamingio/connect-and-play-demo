'use client';

import { useOperator } from '@/state/OperatorContext';
import {
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import React, { useEffect, useMemo } from 'react';
import BetRowProfit from './BetRowProfit';
import TokenIcon from './CurrencySymbol';
import ShortenBitcoinAddress from './ShortenBitcoinAddress';

interface DataRow {
  _id: string;
  gameId: string;
  betAmount: number;
  outcome: string;
  timestamp: string;
  winningAmount?: number;
  payoutAmount: number;
  hash: string;
  playerAddress: string;
  gameName?: string;
  name?: string;
  explorerUrl?: string;
  chainId: number;
  token: string;
}

interface ResponsiveTableProps {
  data: DataRow[];
  showPlayer: boolean;
}

const calcMultiplier = (betAmount: number, winningAmount?: number) =>
  winningAmount ? ((winningAmount + betAmount) / betAmount).toFixed(2) : 0;

const calcProfit = (outcome: string, betAmount: number, payoutAmount: number = 0) =>
  outcome.toLowerCase() === 'win' ? payoutAmount : payoutAmount - betAmount;

const CellHeader = styled(TableCell)<{ minWidth?: string; alignright?: string }>`
  color: ${(props) => props.theme.app?.primaryContent};
  min-width: 120px;
  font-family: ${(props) => props.theme.app?.fontFamily};
  font-weight: bold;
  border-bottom: none;
  text-align: ${(props) => (props.alignright ? 'right' : 'left')};
  background-color: ${(props) => props.theme.app?.elevation1};
`;

const StyledRow = styled(TableRow)`
  border-bottom: none;
  background-color: ${(props) => props.theme.app?.elevation1};
  :nth-of-type(odd) {
    background-color: ${(props) => props.theme.app?.bgDefault};
  }
  :hover {
    background-color: ${(props) => props.theme.app?.primaryAccent};
    * {
      color: #222 !important;
      stroke: #222 !important;
    }
  }
`;

const StyledCell = styled(TableCell)<{ alignright?: string }>`
  color: ${(props) => props.theme.app?.primaryContent};
  font-family: ${(props) => props.theme.app?.fontFamily};
  font-weight: bold;
  border-bottom: none;
  text-align: ${(props) => (props.alignright ? 'right' : 'left')};
`;

const Time = ({ timestamp }: { timestamp: string }) => {
  const t = useTranslations();

  const date = new Date(Number(timestamp));

  const secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000);
  if (secondsAgo < 60)
    return t('components.responsivetable.time.seconds', {
      value: secondsAgo,
    });

  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60)
    return t('components.responsivetable.time.minutes', {
      value: minutesAgo,
    });

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24)
    return t('components.responsivetable.time.hours', {
      value: hoursAgo,
    });

  const daysAgo = Math.floor(hoursAgo / 24);
  return t('components.responsivetable.time.days', { value: daysAgo });
};

// TODO: Evaluate if this is a good refresh interval
const refreshInterval = 1000;

// TODO: Pageinating support?
const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ data, showPlayer = true }) => {
  const t = useTranslations();
  const theme = useTheme();
  const [, setTicker] = React.useState(0);
  const { operator } = useOperator();

  const tokenSymbols = useMemo(
    () =>
      operator?.bankrolls?.reduce(
        (acc, b) => ({
          ...acc,
          [b.tokenAddress]: b.tokenSymbol,
        }),
        {} as Record<string, string>,
      ),
    [operator?.bankrolls],
  );

  const formattedData = data.map((row) => {
    return {
      ...row,
      tokenLogo: tokenSymbols?.[row.token],
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTicker((tick) => tick + 1);
    }, refreshInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <TableContainer
      sx={{
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
      <Table
        sx={{
          flex: '1 0 690px',
          tableLayout: 'fixed',
        }}
      >
        <TableHead>
          <TableRow>
            <CellHeader sx={{ width: 122 }}>
              {t('components.responsivetable.header.dateTime')}
            </CellHeader>
            <CellHeader>{t('components.responsivetable.header.game')}</CellHeader>
            {showPlayer && (
              <CellHeader>{t('components.responsivetable.header.player')}</CellHeader>
            )}
            <CellHeader alignright="true">
              {t('components.responsivetable.header.betAmount')}
            </CellHeader>
            <CellHeader alignright="true">
              {t('components.responsivetable.header.multiplier')}
            </CellHeader>
            <CellHeader alignright="true">
              {t('components.responsivetable.header.payout')}
            </CellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedData.map((row) => (
            <StyledRow key={row.hash || row.timestamp}>
              <StyledCell sx={{ whiteSpace: 'nowrap' }}>
                {/* <Link
                  href={getExplorerUrl(row.hash, row.chainId)}
                  target="_blank"
                  color={theme.app?.primaryContent}
                  underline="none"
                  sx={{
                    my: '-16px',
                    py: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    width: 'auto',
                    justifyContent: 'space-between',
                  }}
                > */}
                <span style={{ color: theme.app?.secondaryContent }}>
                  <Time timestamp={row.timestamp} />
                </span>
                {/* <OpenInNew fontSize="small" /> */}
                {/* </Link> */}
              </StyledCell>
              <StyledCell>{row.gameName}</StyledCell>
              {showPlayer && (
                <StyledCell>
                  <Link
                    color={theme.app?.primaryContent}
                    underline="none"
                    sx={{
                      my: '-16px',
                      py: '16px',
                    }}
                    href={`/account/?a=${row.playerAddress}`}
                    component={NextLink}
                  >
                    {row.name ? (
                      row.name
                    ) : (
                      <ShortenBitcoinAddress
                        address={row.playerAddress}
                        maxLength={12}
                        color={theme.app?.primaryContent ?? 'white'}
                      />
                    )}
                  </Link>
                </StyledCell>
              )}
              <StyledCell alignright="true">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  gap={1}
                >
                  {row.betAmount.toFixed(2)}
                  <TokenIcon token={row.tokenLogo} size={18} />
                </Stack>
              </StyledCell>
              <StyledCell alignright="true">
                {calcMultiplier(row.betAmount, row.winningAmount)}x
              </StyledCell>
              <StyledCell alignright="true">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  gap={1}
                >
                  <BetRowProfit
                    number={calcProfit(row.outcome, row.betAmount, row.payoutAmount)}
                    theme={theme}
                  />
                  <TokenIcon token={row.tokenLogo} size={18} />
                </Stack>
              </StyledCell>
            </StyledRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResponsiveTable;
