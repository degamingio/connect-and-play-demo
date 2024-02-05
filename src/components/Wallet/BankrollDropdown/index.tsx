'use client';

import { NoSsr } from '@mui/material';
import BankrollDropdownButton from './BankrollDropdownButton';

const BankrollDropdown = ({ isMobile }: { isMobile?: boolean }) => (
  <NoSsr>
    <BankrollDropdownButton isMobile={isMobile} />
  </NoSsr>
);

export default BankrollDropdown;
