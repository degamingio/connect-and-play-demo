import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { GameData, RevenueShareResponse } from './RevenueShareDataModel';
import RevenueSummary from './RevenueSummary';

const RevenueShareAccordions = ({ data }: { data: RevenueShareResponse }) => {
  // This function will collect all unique months across all games
  const getAllMonths = () => {
    const allMonths = new Set<string>();
    data.games.forEach((game) => {
      game.months.forEach((monthData) => {
        allMonths.add(monthData.month);
      });
    });
    return Array.from(allMonths).sort((a, b) => b.localeCompare(a)); // Sort in descending order
  };

  const months = getAllMonths();

  return (
    <>
      {months.map((month, index) => (
        <Accordion key={month}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography>{month}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6" color="primary.main">
              Monthly Summary for {month}
            </Typography>
            {/* This will show the summary for the month across all games */}
            <RevenueSummary data={data.overall} />
            <Typography variant="subtitle2" color="primary.main">
              Per Game
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Game Code</TableCell>
                    <TableCell align="right">Debit/Credit Sum</TableCell>
                    <TableCell align="right">Free Sum</TableCell>
                    <TableCell align="right">Bonus Buy Sum</TableCell>
                    <TableCell align="right">Correction Sum</TableCell>
                    {/* Add other columns as needed */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.games.map((game: GameData) => {
                    const monthData = game.months.find((m) => m.month === month);
                    if (!monthData) return null;

                    return (
                      <TableRow
                        key={`${game.game_code}-${month}`}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {game.game_code}
                        </TableCell>
                        <TableCell align="right">{monthData.debitCreditSum}</TableCell>
                        <TableCell align="right">{monthData.freeSum}</TableCell>
                        <TableCell align="right">{monthData.bonusBuySum}</TableCell>
                        <TableCell align="right">{monthData.correctionSum}</TableCell>
                        {/* Add other cells as needed */}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default RevenueShareAccordions;
