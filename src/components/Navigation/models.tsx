import type { ReactElement } from 'react';

interface BaseNavButton {
  title: string;
  hide?: boolean;
  disabled?: boolean;
  icon?: ReactElement;
}

interface ActionButton extends BaseNavButton {
  action: () => void;
  key: string | number;
}

interface PathButton extends BaseNavButton {
  path: string;
}

export type NavButton = ActionButton | PathButton;

export interface NavCategory {
  title: string;
  hide?: boolean;
  key: string | number;
  buttons: NavButton[];
}

export type NavItems = NavCategory[];
