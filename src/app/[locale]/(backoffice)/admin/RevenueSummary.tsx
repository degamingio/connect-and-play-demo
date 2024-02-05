import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { TransactionSum } from './RevenueShareDataModel';

const RevenueSummary = ({ data }: { data: TransactionSum }) => {
  const rows = [{ ...data, id: 'summary' }];
  return (
    <Box sx={{}} flexDirection="row">
      <Typography variant="subtitle2" color="primary.main">
        Summary
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Total Debit/Credit Sum</TableCell>
              <TableCell align="right">Debit/Credit</TableCell>
              <TableCell align="right">Free Debit/Credit</TableCell>
              <TableCell align="right">Correction Debit/Credit</TableCell>
              <TableCell align="right">Bonus Buy Debit/Credit</TableCell>
              <TableCell align="right">Jackpot Credit</TableCell>
              <TableCell align="right">Promo Credit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.debitCreditSum}
                </TableCell>
                <TableCell align="right">{row.debit - row.credit}</TableCell>
                <TableCell align="right">{row.free_debit - row.free_credit}</TableCell>
                <TableCell align="right">
                  {row.correction_debit - row.correction_credit}
                </TableCell>
                <TableCell align="right">
                  {row.bonus_buy_debit - row.bonus_buy_credit}
                </TableCell>
                <TableCell align="right">{row.jackpot_credit}</TableCell>
                <TableCell align="right">{row.promo_credit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RevenueSummary;
