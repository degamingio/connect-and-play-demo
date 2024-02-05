import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';

export interface HeaderButtonProps {
  onClick: () => void;
  children: any;
}

const HeaderButton = (props: ButtonProps) => (
  <Button
    color="secondary"
    variant="contained"
    sx={{ borderRadius: 999, height: '48px' }}
    {...props}
  />
);

export default HeaderButton;
