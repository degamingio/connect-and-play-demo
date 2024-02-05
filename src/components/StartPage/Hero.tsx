'use client';

import { Box, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations();

  return (
    <Box
      position="relative"
      sx={{
        background: (theme) => theme.app?.bannerBg,
        borderRadius: 2,
        overflow: 'hidden',
      }}
      px={{ xs: 3, lg: 10 }}
      py={{ xs: 5, lg: 10 }}
    >
      <Box
        position="absolute"
        display={{ xs: 'block', lg: 'none' }}
        bottom="-6px"
        right="12px"
        width="128px"
        height="128px"
      >
        <img
          alt="Hero"
          src="/images/hero-image.png"
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain',
            opacity: 0.16,
          }}
        />
      </Box>
      <Stack maxWidth="1024px" mx="auto" direction="row" width="100%">
        <Box width={{ lg: '512px' }}>
          <Typography
            variant="h2"
            fontSize={{ xs: '2rem', lg: '3.5rem' }}
            sx={{
              background: 'linear-gradient(180deg, #FF9436 0%, #EF5B07 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
              lineHeight: '120%',
            }}
          >
            {t('components.hero.header')}
          </Typography>
          <Typography
            variant="h5"
            fontSize={{ xs: '1.125rem', lg: '1.5rem' }}
            mt={1}
            lineHeight={1.5}
          >
            {t('components.hero.subheader')}
          </Typography>
        </Box>
        <Box flexGrow={1} position="relative" display={{ xs: 'none', lg: 'block' }}>
          <img
            alt="Hero"
            src="/images/hero-image.png"
            style={{
              position: 'absolute',
              inset: 0,
              height: '100%',
              width: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Hero;
