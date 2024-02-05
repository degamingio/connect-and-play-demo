'use client';

import { Link, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';

import { useAppConfig } from '@/context/AppConfigContext';

const Column = ({
  title,
  items,
}: {
  title: string;
  items: { to?: string; label: string; onClick?: () => void }[];
}) => (
  <Stack flexGrow={1} gap={1}>
    <Typography variant="h6" fontWeight="700">
      {title}
    </Typography>
    {items.map(({ to, label, onClick }, i) => (
      <Link
        underline="none"
        color="primary"
        component={to ? NextLink : 'button'}
        href={to}
        key={i as number}
        onClick={onClick}
        textAlign="left"
      >
        <Typography fontSize="14px" color={(t) => t.app?.secondaryContent}>
          {label}
        </Typography>
      </Link>
    ))}
  </Stack>
);

const Footer = () => {
  const t = useTranslations();
  const { config } = useAppConfig();

  const columns = [
    {
      title: t('components.footer.platform.title'),
      key: 'platform',
      items: [
        {
          to: 'mailto:support@0xino.io',
          label: t('components.footer.platform.support'),
        },
        {
          to: 'mailto:support@0xino.io',
          label: t('components.footer.platform.contactUs'),
        },
      ],
    },
    {
      title: t('components.footer.legal.title'),
      key: 'legal',
      items: [
        {
          to: '/terms',
          label: t('components.footer.legal.terms'),
        },
        {
          to: '/privacy',
          label: t('components.footer.legal.privacy'),
        },
        { to: '/rgs', label: t('components.footer.legal.rgs') },
      ],
    },
    {
      title: t('components.footer.socials.title'),
      key: 'socials',
      items: [
        {
          label: 'Discord',
          to: 'https://discord.gg/gAktbxzfrh',
        },
        {
          label: 'Twitter',
          to: 'https://twitter.com/0xinoio',
        },
      ],
    },
  ];

  return (
    <Stack
      direction={{ xss: 'column', md: 'row' }}
      mx="auto"
      maxWidth="1208px"
      justifyContent="center"
      columnGap={6}
      rowGap={3}
      p={3}
      pt={8}
    >
      <Stack gap={1} maxWidth="344px">
        <img
          alt={t('components.footer.logoAlt')}
          src={`/assets/images/${config.logoFilename}`}
          width={150}
        />
        <Typography fontSize="14px" color={(theme) => theme.app?.secondaryContent}>
          {t('components.footer.disclaimer')}
        </Typography>
      </Stack>
      {columns.map(({ title, items, key }) => (
        <Column key={key} title={title} items={items} />
      ))}
    </Stack>
  );
};
export default Footer;
