'use client';

import { useQuery } from '@apollo/client';
import {
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { LEADERBOARD_QUERY } from '@/graphql/livebets/LiveBetsQuery';
import { DynamicShortenBitcoinAddress } from '../General/ShortenBitcoinAddress';

const StyledCell = styled(TableCell)`
  color: ${(props) => props.theme.app?.primaryContent};
  border-bottom: none;
  font-weight: 700;
`;

const StyledRow = styled(TableRow)`
  background-color: ${(props) => props.theme.app?.bgDefault};
  :nth-of-type(odd) {
    background-color: ${(props) => props.theme.app?.elevation3};
  }
  :hover {
    background-color: ${(props) => props.theme.app?.primaryAccent};
    * {
      color: #222 !important;
    }
  }
`;

type LeaderboardRow = {
  address: string;
  name: string;
  volume: number;
};

const RankList = () => {
  const { data } = useQuery(LEADERBOARD_QUERY, {
    fetchPolicy: 'network-only',
  });

  const rows = (data?.leaderboard as LeaderboardRow[]) || [];

  const t = useTranslations();
  const { push } = useRouter();

  return (
    <Stack direction="column" p={3} gap={1} bgcolor={(theme) => theme.app?.bgDefault}>
      <Typography variant="subtitle2" fontWeight={700} textTransform="uppercase">
        {t('components.ranklist.title')}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledCell align="left">{t('components.ranklist.rank')}</StyledCell>
              <StyledCell align="left">{t('components.ranklist.player')}</StyledCell>
              <StyledCell align="right">{t('components.ranklist.volume')}</StyledCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <StyledRow
                key={row.address}
                sx={{ cursor: 'pointer' }}
                onClick={() => push(`/account?a=${row.address}`)}
              >
                <StyledCell sx={{ opacity: 0.5 }} align="left">
                  {index + 1}
                </StyledCell>
                <StyledCell align="left">
                  {row.name || (
                    <DynamicShortenBitcoinAddress
                      variant="body2"
                      fontWeight={700}
                      sx={{ color: (theme) => theme.app?.primaryContent }}
                      address={row.address}
                    />
                  )}
                </StyledCell>
                <StyledCell align="right">${row.volume.toFixed(2)}</StyledCell>
              </StyledRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default RankList;
