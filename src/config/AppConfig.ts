import { Inter, Titillium_Web } from 'next/font/google';
import type { Chain } from 'viem';
import { xdc, xdcTestnet } from 'viem/chains';
import { convertToCasinoGames } from './games';

const titilliumWeb = Titillium_Web({
  weight: ['200', '400', '600', '700'],
  subsets: ['latin'],
});

const inter = Inter({
  weight: ['200', '400', '600', '700'],
  subsets: ['latin'],
});

// Update this configuration file based on your project information
export const AppConfig = {
  operatorCode: 'CAP',
  // Language for your site
  locales: ['en'],

  url: process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000',

  // Google Analytics ID => GA_TRACKING_ID
  googleAnalyticsIds: [],

  // Logo for your site, the filename. This file needs to be added in folder `/public/assets/images`
  logoFilename: 'logo.png',
  logoWidth: 150,
  logoHeight: 50,

  // Logo for your mobile site, the filename. This file needs to be added in folder `/public/assets/images`
  mobileLogo: 'logo-square.png',
  mobileLogoHeight: 45,

  headerMinHeight: 80,
  leftDrawerWidth: 240,
  hideFooter: false,
  showIncreaseBalanceButton: false,
  cookiesBanner: true,

  fontFamilyAccent: titilliumWeb,
  fontFamily: titilliumWeb,

  elevation1: '#09100E',
  elevation2: '#0A1412',
  elevation3: '#081712',
  bgDefault: '#010e05',
  primaryContent: '#E3E3E3',
  primaryAccent: '#FF9436',
  secondaryContent: 'rgba(255, 255, 255, 0.48)',
  secondaryAccent: '#86FC79',
  tertiaryAccent: '#fa50ff',
  darkContent: '#222222',
  bannerBg: 'linear-gradient(226.73deg, #092019 -6.55%, #08140D 105.3%)',

  buttonTextColor: '#FFFFFF',
  buttonTextColorDark: '#7D66A2',

  // WEB3
  supportedChains: (process.env.NEXT_PUBLIC_ENVIRONMENT === 'prod'
    ? [{ chain: xdc, rpcUrl: xdc.rpcUrls.default.http[0] }]
    : [
        {
          chain: xdcTestnet,
          rpcUrl: xdcTestnet.rpcUrls.default.http[0],
        },
      ]) as { chain: Chain; rpcUrl: string | undefined }[],

  activeGames: convertToCasinoGames(),
  socials: [
    {
      name: 'Docs',
      url: 'https://docs.degaming.io',
      iconImage: '/images/sidebar-icon-docs.svg',
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/gAktbxzfrh',
      network: 'discord',
      iconImage: null,
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/DeGaming_io',
      network: 'twitter',
      iconImage: '/images/sidebar-icon-X.svg',
    },
  ],
  comingSoonGames: [],
};
