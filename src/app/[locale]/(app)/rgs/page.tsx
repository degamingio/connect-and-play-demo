'use client';

import { List, ListItemText } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { MappedSection, PageHeader } from '@/components/General/StaticPageComponents';

const RgsPage = () => {
  const t = useTranslations('rgs');

  return (
    <>
      <PageHeader title={t('title')} />
      <MappedSection
        t={t}
        sections={['rgs', 'aspects', 'assistance', 'selfExclusion', 'concern']}
      />
    </>
  );
};

export default RgsPage;
