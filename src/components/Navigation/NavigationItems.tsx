'use client';

import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  styled,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import type { NavButton as INavButton, NavCategory as INavCategory } from './models';

interface NavButtonProps {
  navButton: INavButton;
  drawerOpen?: boolean;
  // isMobile?: boolean;
  isActive?: boolean;
}

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'drawerOpen' && prop !== 'active',
})<{
  drawerOpen?: boolean;
  active?: boolean;
  href?: string; // From LinkComponent
}>`
  min-height: 48px;
  background-color: ${({ active, theme }) =>
    active ? theme.app?.elevation3 : theme.app?.elevation1};
  :hover {
    background-color: ${({ theme }) => theme.app?.primaryAccent};
    * {
      color: #222 !important;
    }
  }
  border-radius: 8px;
  grid-gap: 1rem;
  padding: 12px;
`;

export const NavButton = ({ navButton, drawerOpen, isActive }: NavButtonProps) => (
  <ListItem
    disablePadding
    sx={{
      display: navButton.hide ? 'none' : undefined,
      overflow: 'hidden',
      px: 1.5,
    }}
  >
    <StyledListItemButton
      color="primary"
      active={isActive || undefined}
      drawerOpen={drawerOpen}
      onClick={'action' in navButton ? navButton.action : undefined}
      LinkComponent={Link}
      href={'path' in navButton ? navButton.path : undefined}
      disabled={navButton.disabled}
    >
      {navButton.icon && (
        <ListItemIcon
          sx={{
            minWidth: 0,
            borderRadius: '999px',
            overflow: 'hidden',
            justifyContent: 'flex-start',
            color: (theme) =>
              isActive ? theme.app?.primaryAccent : theme.app?.primaryContent,
          }}
        >
          {navButton.icon}
        </ListItemIcon>
      )}

      <Collapse in={drawerOpen} orientation="horizontal">
        <ListItemText
          inset={!navButton.icon}
          primary={
            <Typography
              color={(theme) =>
                isActive ? theme.app?.primaryAccent : theme.app?.primaryContent
              }
              variant="body2"
            >
              {navButton.title}
            </Typography>
          }
          sx={{
            fontFamily: (theme) => theme.app?.fontFamily,
            // opacity: drawerOpen ? 1 : 0,
            // position: drawerOpen ? 'initial' : 'absolute',
            my: 0,
          }}
        />
      </Collapse>
    </StyledListItemButton>
  </ListItem>
);

export const Category = ({
  navCategory,
  drawerOpen,
  isMobile,
}: {
  navCategory: INavCategory;
  drawerOpen?: boolean;
  isMobile?: boolean;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const path = pathname + searchParams.toString();

  return (
    <List
      disablePadding
      subheader={
        <Collapse in={drawerOpen} orientation="horizontal">
          <ListSubheader
            disableSticky
            sx={{
              display: navCategory.hide ? 'none' : undefined,
              overflow: 'hidden',
              lineHeight: '2rem',
            }}
          >
            <Typography variant="overline">{navCategory.title}</Typography>
          </ListSubheader>
        </Collapse>
      }
    >
      {navCategory.buttons.map((navButton) => (
        <NavButton
          key={'path' in navButton ? navButton.path : navButton.key}
          navButton={navButton}
          drawerOpen={drawerOpen}
          // isMobile={isMobile}
          isActive={'path' in navButton && navButton.path === path}
        />
      ))}
    </List>
  );
};

export const NavList = ({
  navItems,
  leftDrawerOpen,
  isMobile,
}: {
  navItems: INavCategory[];
  leftDrawerOpen: boolean;
  isMobile?: boolean;
}) => (
  <List
    sx={{
      pt: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      height: '100%',
      overflowY: 'scroll',
      '&::-webkit-scrollbar': { display: 'none' }, // Chromium
      msOverflowStyle: 'none', // IE and Edge
      scrollbarWidth: 'none', // Firefox
    }}
  >
    {navItems.map((navItem) => (
      <Category
        key={navItem.key}
        navCategory={navItem}
        drawerOpen={leftDrawerOpen}
        isMobile={isMobile}
      />
    ))}
  </List>
);
