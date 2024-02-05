import { type Theme, Typography } from '@mui/material';
import React from 'react';

interface BetRowProps {
  number: any;
  theme: Theme;
}

const BetRowProfit: React.FC<BetRowProps> = ({ number, theme }) => {
  const profitValue = Math.abs(number).toFixed(2);

  return (
    <Typography
      variant="body2"
      fontWeight={700}
      color={number > 0 ? theme.app?.secondaryAccent : theme.app?.primaryContent}
    >
      {number > 0 ? '+' : '-'}
      {profitValue}
    </Typography>
  );
};

export default BetRowProfit;
