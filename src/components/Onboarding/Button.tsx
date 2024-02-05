'use client';

import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import OnboardingModal from './Modal';

const OnboardingButton = ({ rawBalance }: { rawBalance: bigint }) => {
  const [showModal, setShowModal] = useState(false);
  const t = useTranslations();

  if (rawBalance > 0n) return null;

  return (
    <>
      <Button
        variant="contained"
        sx={{ borderRadius: 999 }}
        onClick={() => setShowModal(true)}
      >
        {t('components.bridgeswap.cta')}
      </Button>
      <OnboardingModal onClose={() => setShowModal(false)} open={showModal} />
    </>
  );
};

export default OnboardingButton;
