import GameHeader from '@/components/Game/GameHeader';
import LiveBets from '@/components/LiveBets/LiveBets';
import { AppConfig } from '@/config/AppConfig';
import { Stack } from '@mui/material';
import Game from './Game';

export async function generateMetadata({ params }: { params: { gameSlug: string } }) {
  const { gameSlug } = params;

  const title = AppConfig.activeGames.find((game) => game.slug === gameSlug)?.name;

  return {
    title,
  };
}

const GamePage = ({ params }: { params: { gameSlug: string } }) => {
  const { gameSlug } = params;

  const selectedGame =
    AppConfig.activeGames.find((game) => game.slug === gameSlug) ||
    AppConfig.activeGames[0];

  if (!selectedGame) return null;

  return (
    <>
      <Stack
        py={{ sm: 3, md: 2 }}
        px={{ sm: 0, md: 2 }}
        gap={2}
        borderRadius={1}
        bgcolor="background.paper"
      >
        <GameHeader title={selectedGame.name} topTitle={selectedGame.studioName} />
        <Game selectedGame={selectedGame} />
      </Stack>
      <LiveBets
        key={selectedGame.slug}
        gameId={selectedGame.slug}
        operatorCode={AppConfig.operatorCode}
      />
    </>
  );
};

export default GamePage;
