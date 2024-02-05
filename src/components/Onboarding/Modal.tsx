'use client';

import {
  Box,
  Button,
  Dialog,
  Stack,
  SxProps,
  Tab,
  Tabs,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

type Translation = ReturnType<typeof useTranslations<any>>;

const steps = [
  [
    {
      img: '/images/bridgeswap/bridge-1.png',
      content: (t: Translation) =>
        t.rich('components.bridgeswap.step1', {
          swaplink: (chunks) => <Link href="https://simpleswap.io/">{chunks}</Link>,
        }),
    },
    {
      img: '/images/bridgeswap/bridge-2.png',
      content: (t: Translation) =>
        t.rich('components.bridgeswap.step2', {
          swaplink: (chunks) => <Link href="https://simpleswap.io/">{chunks}</Link>,
        }),
    },
    {
      img: '/images/bridgeswap/bridge-3.png',
      content: (t: Translation) => t('components.bridgeswap.step3'),
    },
  ],
  [
    {
      img: '/images/bridgeswap/swap-1.png',
      content: (t: Translation) =>
        t.rich('components.bridgeswap.step4', {
          xsplink: (chunks) => (
            <Link href="https://v3.xspswap.finance/#/swap">{chunks}</Link>
          ),
        }),
    },
    {
      img: '/images/bridgeswap/swap-2.png',
      content: (t: Translation) => t('components.bridgeswap.step5'),
    },
  ],
];

const tabSx: SxProps<Theme> = {
  textTransform: 'none',
  fontSize: '1.125rem',
  fontWeight: 700,
  bgcolor: (theme) => theme.app?.elevation1,
  color: (theme) => theme.app?.secondaryContent,
  '&.Mui-selected': {
    bgcolor: (theme) => theme.app?.elevation3,
    color: (theme) => theme.app?.primaryContent,
  },
};

const Dots = ({ active, max = 0 }: { active: number; max?: number }) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      spacing={1.5}
      height={64}
      alignItems="center"
      justifyContent="center"
    >
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          style={{
            transition: 'all 0.1s ease-in-out',
            width: active === i ? 16 : 8,
            height: active === i ? 16 : 8,
            borderRadius: '50%',
            backgroundColor:
              active === i ? theme.app?.primaryContent : theme.app?.secondaryContent,
          }}
        />
      ))}
    </Stack>
  );
};

const nextText = (tab: number, step: number, t: Translation) => {
  if (tab === 0 && step === 2) return t('components.bridgeswap.nextSwap');
  if (tab === 1 && step === 1) return t('components.bridgeswap.nextDone');
  return t('components.bridgeswap.next');
};

const OnboardingModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const t = useTranslations<any>();

  const [tab, setTab] = useState(0);
  const [step, setStep] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setStep(0);
    setTab(newValue);
  };

  const incStep = () => {
    if (tab === 0 && step === 2) {
      setTab(1);
      setStep(0);
    } else if (tab === 1 && step === 1) onClose();
    else setStep((prev) => prev + 1);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: (t) => t.app?.elevation3,
          maxWidth: { xs: '651px !important', width: '100%' },
          m: { xs: '1rem' },
        },
      }}
      scroll="body"
    >
      <Box
        width="100%"
        pt="56%"
        overflow="hidden"
        sx={{
          backgroundImage: `url(${steps[tab]?.[step]?.img})`,
          backgroundSize: 'cover',
        }}
      ></Box>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="fullWidth"
        TabIndicatorProps={{ sx: { display: 'none' } }}
      >
        <Tab disableRipple label="Bridge to XDC" sx={tabSx} />
        <Tab disableRipple label="Swap to xUSDT" sx={tabSx} />
      </Tabs>
      <Stack direction="column">
        <Typography
          sx={{
            width: '100%',
            a: {
              color: (theme) => theme.app?.primaryContent,
              textDecoration: 'underline',
            },
          }}
          p={3}
        >
          {steps[tab]?.[step]?.content(t)}
        </Typography>
        <Dots active={step} max={steps[tab]?.length} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={3}
          py={2}
        >
          {step > 0 && (
            <Button
              onClick={() => setStep((prev) => prev - 1)}
              sx={{ borderRadius: '999px' }}
              color="success"
            >
              Back
            </Button>
          )}
          <Button
            onClick={incStep}
            sx={{ borderRadius: '999px', ml: 'auto' }}
            color="success"
            variant="contained"
          >
            {nextText(tab, step, t)}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default OnboardingModal;
