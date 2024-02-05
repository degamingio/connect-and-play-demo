'use client';

import { useAppConfig } from '@/context/AppConfigContext';
import { Card, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Game = {
  name: string;
  slug?: string;
  iconImage?: string;
  thumbnail?: string;
  gameColor?: string;
  gameColorDark?: string;
};

const after = {
  position: 'relative',
  ':after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#fff',
    opacity: 0,
    transition: 'opacity 0.1s ease-in-out',
    blendMode: 'overlay',
    zIndex: 9,
  },
  ':hover': {
    ':after': {
      opacity: 0.1,
    },
  },
};

const GameCardInner = ({
  game,
  disabled,
  children,
}: {
  game: Game;
  disabled?: boolean;
  children?: ReactNode;
}) => (
  <Card
    sx={{
      position: 'relative',
      pt: '63.2%',
      borderRadius: '8px',
      cursor: !disabled ? 'pointer' : undefined,
      overflow: 'hidden',
      img: {
        transition: 'all 0.2s ease-in-out',
        transform: 'scale(1)',
      },
      '&:hover': {
        img: {
          transform: 'scale(1.02)',
          opacity: 0.9,
        },
      },
    }}
  >
    <Image
      // @ts-ignore
      src={game.thumbnail}
      fill
      alt={game.name}
    />
  </Card>
);

const ComingSoonGameCard = ({ game }: { game: Game }) => {
  const theme = useTheme();
  return (
    <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
      <GameCardInner disabled game={game}>
        <Typography
          variant="body1"
          fontSize="1.125rem"
          fontWeight="600"
          p={1}
          bgcolor="#3f3f3f"
          color={theme.app?.secondaryContent}
          mr="auto"
          lineHeight="1.2"
          width="max-content"
          borderRadius={1}
          ml="-4px"
          mb="-6px"
        >
          Coming Soon
        </Typography>
      </GameCardInner>
    </Grid>
  );
};

const GameCard = ({ game }: { game: Game }) => (
  <Grid item xs={6} sm={6} md={4}>
    <Link href={`/games/${game.slug}`}>
      <GameCardInner game={game} />
    </Link>
  </Grid>
);

const GameCards = () => {
  const { config } = useAppConfig();
  const activeGames = config?.activeGames ?? [];
  const comingSoonGames = config?.comingSoonGames ?? [];

  return (
    <Grid container spacing={{ xs: 1.25, lg: 3 }}>
      {activeGames.map((game) => (
        <GameCard key={game.slug} game={game} />
      ))}
    </Grid>
  );
};

export default GameCards;
