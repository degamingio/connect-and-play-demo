'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { AppConfig } from '@/config/AppConfig';

export default function CookiesBanner() {
  const t = useTranslations();
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const rawBoolean =
      window?.sessionStorage?.getItem('cookiesBannerAccepted') || 'false';
    setBannerOpen(!JSON.parse(rawBoolean));
  }, []);

  const acceptButtonClicked = () => {
    setBannerOpen(false);
    window?.sessionStorage?.setItem('cookiesBannerAccepted', JSON.stringify(true));
  };

  const declineButtonClicked = () => {
    setBannerOpen(true);
    const redirectTo = t('components.cookiesBanner.declineRedirect');
    if (redirectTo) {
      window.location.href = redirectTo;
    }
  };

  return (
    <TrapFocus open disableAutoFocus disableEnforceFocus>
      <Fade appear={false} in={bannerOpen}>
        <Paper
          role="dialog"
          aria-modal="false"
          aria-label={t('components.cookiesBanner.ariaLabel')}
          square
          variant="outlined"
          tabIndex={-1}
          sx={{
            backgroundColor: AppConfig.elevation3,
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            m: 0,
            p: '24px',
            borderWidth: 0,
            borderTopWidth: 1,
            zIndex: 1200,
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            gap={2}
          >
            <Box
              sx={{
                flexShrink: 1,
                alignSelf: { xs: 'flex-start', sm: 'center' },
              }}
            >
              <Typography fontWeight="bold">
                {t('components.cookiesBanner.title')}
              </Typography>
              <Typography variant="body2">
                {t('components.cookiesBanner.message')}
              </Typography>
            </Box>
            <Stack
              gap={2}
              direction={{
                xs: 'row-reverse',
                sm: 'row',
              }}
              sx={{
                flexShrink: 0,
                alignSelf: { xs: 'flex-end', sm: 'center' },
              }}
            >
              <Button size="small" onClick={acceptButtonClicked} variant="contained">
                {t('components.cookiesBanner.acceptButton')}
              </Button>
              {t('components.cookiesBanner.declineButton') && (
                <Button size="small" onClick={declineButtonClicked}>
                  {t('components.cookiesBanner.declineButton')}
                </Button>
              )}
            </Stack>
          </Stack>
        </Paper>
      </Fade>
    </TrapFocus>
  );
}
