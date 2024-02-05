'use client';

import { useAppConfig } from '@/context/AppConfigContext';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, Stack, SwipeableDrawer } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import BankrollDropdown from '../Wallet/BankrollDropdown';
import WalletButton from '../Wallet/WalletButton';
import WalletDropdown from '../Wallet/WalletDropdown';
import { NavList } from './NavigationItems';
import type { NavItems } from './models';

const DrawerContainer = styled('div')(({ theme }) => ({
  width: theme.app?.leftDrawerWidth,
}));

export interface Props {
  navItems: NavItems;
}

const MobileMenu = ({ navItems }: Props) => {
  const router = useRouter();
  const theme = useTheme();
  const { config } = useAppConfig();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setDrawerOpen(open);
    };

  return (
    <>
      <AppBar>
        <Toolbar
          sx={{
            bgcolor: theme.app?.elevation2,
          }}
        >
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{ width: '48px', height: '48px' }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon style={{ color: theme.app?.secondaryAccent, fontSize: 24 }} />
          </IconButton>

          <Box display={{ xs: 'none', sm: 'flex' }}>
            <img
              src={`/assets/images/${config.mobileLogo}`}
              style={{
                maxHeight: 60,
                cursor: 'pointer',
                height: theme.app?.mobileLogoHeight,
                marginLeft: 10,
              }}
              onClick={() => router.push('/')}
            />
          </Box>
          <Stack
            spacing={1}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
          >
            <BankrollDropdown isMobile />
            <WalletDropdown isMobile />
            <WalletButton />
          </Stack>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        disableDiscovery
        disableBackdropTransition
        anchor="left"
        open={drawerOpen}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <DrawerContainer
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          style={{
            backgroundColor: theme.app?.elevation1,
            height: '100%',
            maxHeight: '100vh',
          }}
        >
          <NavList navItems={navItems} leftDrawerOpen isMobile />
        </DrawerContainer>
      </SwipeableDrawer>
    </>
  );
};

export default MobileMenu;
