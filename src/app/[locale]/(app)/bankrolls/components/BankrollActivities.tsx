
import { Typography, TableBody, Paper, Table, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const greenColor = 'rgb(39, 174, 96)'
const redColor = 'rgb(253, 64, 64)'

const rows = [
    createData('$550', 'Deposit', greenColor, '0xf6b...62ac', '0.1%', 'just now'),
    createData('$12,000', 'Deposit', greenColor, '0xa2b...62f2', '2.3%', '1 min ago'),
    createData('$120', 'Withdraw', redColor, '0xaab...71af', '0.04%', '2 min ago'),
    createData('$9', 'Deposit', greenColor, '0xbfb...31ac', '0.01%', '2 min ago'),
    createData('$1,000', 'Withdraw', redColor, '0xc01...41ad', '0.8%', '3 min ago'),
    createData('$9,500', 'Deposit', greenColor, '0xfb1...21ac', '1.2%', '5 min ago'),
];

function createData(
    investment: string,
    activity: string,
    color: string,
    investor: string,
    stake: string,
    date: string,
) {
    return { investment, activity, color, investor, stake, date };
}

const BankrollActivities = () => {

    return (
        <><Typography variant="h5" color="white" sx={{ marginTop: 4 }}>Activites</Typography>
            <TableContainer component={Paper} sx={{
                backgroundColor: "#040C26",
                borderRadius: 5,
                marginTop: 4,
                paddingLeft: 4,
                paddingRight: 4,
                paddingBottom: 1,
            }}>
                <Table sx={{
                    minWidth: 650,
                }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ 'td, th': { borderBottom: '0.5px solid #0e1a40' } }}>
                            <TableCell sx={{ color: "white", fontSize: 16, opacity: 0.6 }}>Investment</TableCell>
                            <TableCell align="right" sx={{ color: "white", fontSize: 16, opacity: 0.6 }}>Activity</TableCell>
                            <TableCell align="right" sx={{ color: "white", fontSize: 16, opacity: 0.6 }}>Wallet</TableCell>
                            <TableCell align="right" sx={{ color: "white", fontSize: 16, opacity: 0.6 }}>Stake</TableCell>
                            <TableCell align="right" sx={{ color: "white", fontSize: 16, opacity: 0.6 }}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.investment}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, 'td, th': { borderBottom: '0.5px solid #0e1a40' } }}
                            >
                                <TableCell component="th" scope="row" sx={{ color: "white" }}>
                                    <img src="/images/USDT.png" style={{ height: 20, marginRight: 10, float: 'left' }} />
                                    <Typography sx={{ fontSize: 16, lineHeight: 1.2 }} color={row.color}>{row.investment}</Typography>
                                </TableCell>
                                <TableCell align="right" sx={{ fontSize: 16, color: "white" }}>{row.activity}</TableCell>
                                <TableCell align="right" sx={{ fontSize: 16, color: "white", cursor: 'pointer' }}>
                                    {row.investor}
                                    <ContentCopyIcon sx={{ fontSize: 14, marginLeft: 1, marginBottom: -0.1 }} />
                                </TableCell>
                                <TableCell align="right" sx={{ fontSize: 16, color: "white" }}>{row.stake}</TableCell>
                                <TableCell align="right" sx={{ fontSize: 16, color: "white" }}>{row.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer >
        </>
    )
}

export default BankrollActivities;