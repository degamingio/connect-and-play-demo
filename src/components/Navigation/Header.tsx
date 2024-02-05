'use client';

import { AppBar, Stack, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

import { useAppConfig } from '@/context/AppConfigContext';

import WalletButton from '../Wallet/WalletButton';
import WalletDropdownWrapper from '../Wallet/WalletDropdown/index';
import BankrollDropdownWrapper from '../Wallet/BankrollDropdown/index';
import BankrollDropdownButton from '../Wallet/BankrollDropdown/BankrollDropdownButton';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0 10px',
  minHeight: theme.app?.headerMinHeight,
  height: theme.app?.headerMinHeight,
  backgroundColor: theme.app?.elevation2,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface HeaderProps {
  logoTitle: string;
}

const LogoImage = styled('img')`
  width: ${({ theme }) => theme.app?.logoWidth}px;
  height: ${({ theme }) => theme.app?.logoHeight}px;
  min-height: ${({ theme }) => theme.app?.logoHeight}px;
  max-height: ${({ theme }) => theme.app?.logoHeight}px;
`;

const Header = ({ logoTitle }: HeaderProps) => {
  const { config } = useAppConfig();

  return (
    <AppBar
      sx={{
        backgroundColor: (theme) => theme.app?.elevation2,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Stack
          spacing={1}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          width="100%"
        >
          <Link
            href="/"
            style={{
              marginLeft: '16px',
              marginRight: 'auto',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LogoImage
              alt={logoTitle}
              src={`/assets/images/${config.logoFilename}`}
              title={logoTitle}
            />
          </Link>
          <BankrollDropdownWrapper />
          <WalletDropdownWrapper />
          <WalletButton />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
