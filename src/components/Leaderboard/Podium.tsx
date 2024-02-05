import { Stack } from '@mui/material';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

const Podium = ({
  rows,
}: {
  rows: {
    name?: string;
    address: string;
    volume: number;
  }[];
}) => {
  const podium = rows?.slice(0, 3);

  if (!podium?.length) return null;

  return (
    <Stack
      direction="row"
      sx={{ width: '100%' }}
      justifyContent="stretch"
      alignItems="flex-end"
    >
      <Stack flexGrow={1} direction="column" alignItems="center">
        <Jazzicon
          diameter={142}
          paperStyles={{ borderRadius: '999px' }}
          seed={jsNumberForAddress(podium[1]?.address!)}
        />
      </Stack>
      <Stack flexGrow={1} direction="column" alignItems="center">
        <Jazzicon
          diameter={220}
          paperStyles={{ borderRadius: '999px' }}
          seed={jsNumberForAddress(podium[0]?.address!)}
        />
      </Stack>
      <Stack flexGrow={1} direction="column" alignItems="center">
        <Jazzicon
          diameter={142}
          paperStyles={{ borderRadius: '999px' }}
          seed={jsNumberForAddress(podium[2]?.address!)}
        />
      </Stack>
    </Stack>
  );
};

export default Podium;
