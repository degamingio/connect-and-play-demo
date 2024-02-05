import { Box, Stack } from '@mui/material';

import RankList from '@/components/Leaderboard/RankList';
import Image from 'next/image';

const LeaderboardPage = () => {
  return (
    <Stack gap={3}>
      <Box
        overflow="hidden"
        position="relative"
        display={{ xs: 'none', sm: 'grid' }}
        flexDirection="column"
        pb={'33%'}
      >
        <Image src={'/images/leaderboard-hero.png'} alt="Leaderboard Legends" fill />
      </Box>
      <Box
        overflow="hidden"
        position="relative"
        display={{ xs: 'grid', sm: 'none' }}
        flexDirection="column"
        pb={'100%'}
      >
        <Image
          src={'/images/leaderboard-hero-mobile.png'}
          alt="Leaderboard Legends"
          fill
        />
      </Box>
      <RankList />
    </Stack>
  );
};

export default LeaderboardPage;
