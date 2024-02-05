
import { Typography, Box, Stack, Button, Badge, } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';

const BankrollGame = () => {
    const sm = useMediaQuery('(max-width:450px)');

    return (
        <Box sx={{ display: 'flex', marginBottom: 10 }}>
            <Stack direction={sm ? "column" : "row"} spacing={1} sx={{ display: 'flex' }}>
                <img src="/images/aviatrix.jpg" style={{ height: 300, borderRadius: 20, marginRight: sm ? 0 : 8 }} />
                <Box sx={{ padding: 0.5 }}>
                    <Typography variant="h3" color="white" fontWeight="bold">Aviatrix</Typography>
                    <Typography color="lightgray" fontSize={20}>Aviatrix</Typography>
                    <Typography color="#9b51e0" sx={{ marginTop: -0.51, cursor: "pointer" }}>https://aviatrix.bet/</Typography>
                    <Typography color="white" fontSize={16}><br />Get ready to become the next Top Gun and fly across an endless sky as today we are taking a look at a lovely and dare we say innovative crash game – Aviatrix. Released on 18/10/2022 this crash game combines a pretty design with interesting mechanics and features, such as customization options, tournaments where you can win different prizes, and even upgrade your plane!</Typography>
                    {/* <br /><Button size="large" variant="contained" sx={{ borderRadius: 5 }}>play aviatrix</Button> */}
                </Box>
            </Stack>
        </Box>
    )
}

export default BankrollGame;