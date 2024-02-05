
import { Typography, Box } from "@mui/material"
import LiquidityProvider from "./LiquidityProvider"

const BankrollLeft = () => {

    const Title = ({ text }: { text: string }) => {
        return (<Typography variant="h6" sx={{ color: "lightgray" }}>{text}</Typography>)
    }

    const Text = ({ text }: { text: string }) => {
        return (<Typography variant="h4" sx={{ color: "white" }} fontWeight="bold">{text}</Typography>)
    }

    const Subtitle = ({ text, color }: { text: string, color: string }) => {
        return (<Typography variant="h6" sx={{ color }}>{text}</Typography>)
    }

    const Item = ({ title, text, subtitle, color }: { title: string, text: string, subtitle?: string, color?: string }) => {
        return (<Box sx={{ marginBottom: 4 }}>
            <Title text={title} />
            <Text text={text} />
            {subtitle && <Subtitle text={subtitle} color={color ?? 'white'} />}
        </Box>)
    }

    return (
        <Box flexDirection="column" sx={{
            width: 230,
            height: 500,
            backgroundColor: "#040C26",
            marginRight: 2,
            borderRadius: 5,
            padding: 3,
        }}>
            <Item title="Yield 30 days" text="$0.0" subtitle="0.0%" color="rgb(39, 174, 96)" />
            <Item title="Yield 7 days" text="$0.0" subtitle="0.0%" color="rgb(39, 174, 96)" />
            {/* <Item title="Total Yield" text="$844k" /> */}
        </Box>
    )
}

export default BankrollLeft;