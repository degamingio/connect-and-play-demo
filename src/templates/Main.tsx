'use client';

import { Stack, Toolbar, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { SocialIcon } from 'react-social-icons';
import { useAccount } from 'wagmi';

import CookiesBanner from '@/components/General/CookiesBanner';
import Header from '@/components/Navigation/Header';
import LeftDrawer from '@/components/Navigation/LeftDrawer';
import MobileMenu from '@/components/Navigation/MobileLeftMenu';
import type { NavCategory } from '@/components/Navigation/models';
import Footer from '@/components/Structure/Footer';
import { AppConfig } from '@/config/AppConfig';
import { useAppConfig } from '@/context/AppConfigContext';

type IMainProps = {
  meta?: any;
  children: any;
};

const PlaceholderIcon = () => (
  <div
    style={{
      width: 24,
      height: 24,
      background: 'rgba(255,255,255,0.5)',
      borderRadius: '50%',
    }}
  />
);

const Column = ({ children }: { children: React.ReactNode }) => (
  <Stack
    py={{ xs: 3, md: 3 }}
    px={{ xs: 2, md: 3 }}
    minHeight="750px"
    maxWidth="1208px"
    gap={3}
    direction="column"
    mx="auto"
  >
    {children}
  </Stack>
);

const Main = (props: IMainProps) => {
  const { config } = useAppConfig();
  const isMobile = useMediaQuery('(max-width:1100px)');
  const { isConnected, isReconnecting } = useAccount();
  const t = useTranslations();

  const profileNavItems = useMemo<NavCategory>(
    () => ({
      title: t('components.leftdrawer.accountCategory'),
      key: 'profile',
      buttons: [
        {
          title: t('components.leftdrawer.myAccount'),
          icon: (
            <img
              alt="account"
              src="/images/sidebar-icon-account.svg"
              width={24}
              height={24}
            />
          ),
          path: '/account',
          disabled: !isConnected || isReconnecting,
        },
        {
          title: t('components.leftdrawer.leaderboard'),
          icon: (
            <img
              alt="leaderboard"
              src="/images/sidebar-icon-leaderboard.svg"
              width={24}
              height={24}
            />
          ),
          path: '/leaderboard',
        },
      ],
    }),
    [t, isConnected, isReconnecting],
  );

  const gamesNavItems = useMemo<NavCategory>(
    () => ({
      title: t('components.leftdrawer.gamesCategory'),
      key: 'games',
      buttons: [
        ...config.activeGames.map((g) => ({
          title: g.name!,
          icon: g.iconImage ? (
            <img alt={g.name} src={g.iconImage} width={24} height={24} />
          ) : (
            <PlaceholderIcon />
          ),
          path: `/games/${g.slug}`,
        })),
        // ...config.comingSoonGames
        //   .filter(({ slug }) => config.activeGames.some((g) => g.slug !== slug))
        //   .map((g) => ({
        //     title: g.name!,
        //     icon: g.iconImage ? (
        //       <img alt={g.name} src={g.iconImage} width={24} height={24} />
        //     ) : (
        //       <PlaceholderIcon />
        //     ),
        //     path: `/games/${g.slug}`,
        //     disabled: true,
        //   })),
      ],
    }),
    [t, config.activeGames, config.comingSoonGames],
  );

  const socialsNavItems = useMemo<NavCategory>(
    () => ({
      title: t('components.leftdrawer.socialsCategory'),
      key: 'conect',
      buttons: config.socials.map((s) => ({
        title: s.name!,
        icon: s.iconImage ? (
          <img alt={s.name} src={s.iconImage} width={24} height={24} />
        ) : s.network ? (
          <SocialIcon network={s.network} style={{ width: 24, height: 24 }} as="div" />
        ) : (
          <PlaceholderIcon />
        ),
        path: s.url,
        // disabled: true,
      })),
    }),
    [t, config.socials],
  );

  const navItems = useMemo(
    () => [profileNavItems, gamesNavItems, socialsNavItems],
    [profileNavItems, gamesNavItems, socialsNavItems],
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: (th) => th.app?.bgDefault,
        }}
      >
        {props.meta}
        {!isMobile && <Header logoTitle="logo" />}
        {isMobile && <MobileMenu navItems={navItems} />}
        {!isMobile && <LeftDrawer key="desktop-drawer" navItems={navItems} />}
        <Box component="main" sx={{ flexGrow: 1 }} position="relative">
          <Toolbar />
          <Column>{props.children}</Column>
          {!config?.hideFooter && <Footer />}
        </Box>
      </Box>
      {AppConfig.cookiesBanner && <CookiesBanner />}
    </>
  );
};

Main.Column = Column;

export default Main;
