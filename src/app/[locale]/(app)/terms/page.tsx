import { useTranslations } from 'next-intl';

import { MappedSection, PageHeader } from '@/components/General/StaticPageComponents';

const TermsPage = () => {
  const t = useTranslations('terms');

  const sections = [
    'introduction',
    'accountCreation',
    'suspension',
    'incomeAndBets',
    'withdrawals',
    'other',
    'obligations',
    'ip',
    'complaints',
    'breaches',
    'conduct',
  ];

  return (
    <>
      <PageHeader title={t('title')} />
      <MappedSection t={t} sections={sections} />
    </>
  );
};

export default TermsPage;
