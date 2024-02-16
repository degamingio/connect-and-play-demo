'use client';

import { AppConfig } from '@/config/AppConfig';
import { QUERY_USER_STATISTICS } from '@/graphql/users/UserQuery';
import { useQuery } from '@apollo/client';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

type UserStats = {
  wagered: number;
  totalBets: number;
  totalWins: number;
  totalLosses: number;
  highestWin: number;
  highestMultiplier: number;
  favoriteGame?: string;
  grossProfit: number;
  netProfit: number;
};

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: ${(props) => props.theme.app?.elevation1};
  }
  padding: 1rem;
  & > td {
    color: ${(props) => props.theme.app?.primaryContent};
  }
`;

const Row = ({ label, value }: { label: string; value: string | number }) => (
  <StyledTableRow>
    <TableCell sx={{ borderBottom: 'none', fontWeight: 700 }}>{label}</TableCell>
    <TableCell sx={{ borderBottom: 'none', fontWeight: 700 }} align="right">
      {value}
    </TableCell>
  </StyledTableRow>
);

const Statistics = ({ walletAddress }: { walletAddress: string }) => {
  const theme = useTheme();
  const { data } = useQuery<{ userStats: UserStats }>(QUERY_USER_STATISTICS, {
    variables: { walletAddress, operatorCode: AppConfig.operatorCode },
    skip: !walletAddress,
    fetchPolicy: 'network-only',
  });

  return (
    <Card
      sx={{
        minHeight: 564,
        flexGrow: 9999,
        flexShrink: 9999,
        borderRadius: 2,
        backgroundColor: theme.app?.elevation3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="subtitle2" fontWeight={700}>
          Statistics
        </Typography>
        {data?.userStats && (
          <TableContainer sx={{ mt: 3 }}>
            <Table>
              <TableBody>
                <Row label="Wagered" value={`$${data.userStats.wagered.toFixed(2)}`} />
                <Row label="Bets" value={data.userStats.totalBets} />
                <Row label="Bets Won" value={data.userStats.totalWins} />
                <Row label="Bets Lost" value={data.userStats.totalLosses} />
                <Row
                  label="Highest Win"
                  value={`$${data.userStats.highestWin.toFixed(2)}`}
                />
                <Row
                  label="Highest Multiplier"
                  value={`${(data.userStats.highestMultiplier + 1).toFixed(2)}x`}
                />
                <Row label="Favorite Game" value={data.userStats.favoriteGame ?? '-'} />
                <Row
                  label="Gross Profit"
                  value={`$${data.userStats.grossProfit.toFixed(2)}`}
                />
                <Row
                  label="Net Profit"
                  value={`$${data.userStats.netProfit.toFixed(2)}`}
                />
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default Statistics;
