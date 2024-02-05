import { List, ListItemText } from '@mui/material';
import { useTranslations } from 'next-intl';

import {
  BodyText,
  MappedSection,
  PageHeader,
  PageSubHeader,
  Section,
  Sections,
} from '@/components/General/StaticPageComponents';

const PrivacyPage = () => {
  const t = useTranslations('privacy');

  return (
    <>
      <PageHeader title={t('title')} />
      <MappedSection
        t={t}
        sections={['privacyPolicy', 'acceptance', 'cookies', 'contact']}
      />
    </>
  );
};

export default PrivacyPage;
