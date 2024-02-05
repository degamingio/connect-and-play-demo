'use client';

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Box, Button, Toolbar, useMediaQuery } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import type { CSSObject, Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

import type { NavItems } from './models';
import { NavList } from './NavigationItems';

const openedMixin = (theme: Theme): CSSObject => ({
  width: theme.app?.leftDrawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(10)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop: string) => prop !== 'open',
})(({ theme, open }) => ({
  width: theme.app?.leftDrawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export interface Props {
  navItems: NavItems;
}

const LeftDrawer = ({ navItems }: Props) => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(true);
  const isMobile = useMediaQuery('(max-width:1100px)');

  const toggle = () => setLeftDrawerOpen(!leftDrawerOpen);

  return (
    <Drawer
      variant="permanent"
      open={leftDrawerOpen}
      PaperProps={{
        sx: {
          overflow: 'hidden',
          zIndex: (th) => th.zIndex.drawer,
          backgroundColor: (th) => th.app?.elevation1,
        },
      }}
    >
      <Toolbar />
      <NavList navItems={navItems} leftDrawerOpen={leftDrawerOpen} isMobile={isMobile} />
      <Box mt="auto" display="flex" justifyContent="flex-end" p={1.5} pb={3}>
        <Button
          onClick={toggle}
          color="secondary"
          variant="contained"
          sx={{
            height: '40px',
            width: '40px',
            minWidth: '40px',
            padding: 0,
            borderRadius: '50%',
          }}
        >
          {!leftDrawerOpen ? (
            <KeyboardDoubleArrowRightIcon color="success" />
          ) : (
            <KeyboardDoubleArrowLeftIcon color="success" />
          )}
        </Button>
      </Box>
    </Drawer>
  );
};

export default LeftDrawer;
