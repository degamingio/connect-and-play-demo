import FileCopy from '@mui/icons-material/FileCopyOutlined';
import type { TypographyProps } from '@mui/material';
import { Typography } from '@mui/material';
import React from 'react';

interface ShortenBitcoinAddressProps {
  address: string;
  maxLength: number;
  color: string;
}

const ShortenBitcoinAddress: React.FC<ShortenBitcoinAddressProps> = ({
  address,
  maxLength,
  color,
}) => {
  const startLength = maxLength - 4;
  const shortenedAddress = `${address.substring(0, startLength)}...${address.substring(
    address.length - 4,
  )}`;

  return (
    <span title={address} style={{ color }}>
      {shortenedAddress}
    </span>
  );
};

export const DynamicShortenBitcoinAddress = ({
  address = '0x0',
  hideCopy,
  ...typographyProps
}: {
  address: string;
  hideCopy?: boolean;
} & TypographyProps) => {
  const start = address.substring(0, address.length - 4);
  const end = address.substring(address.length - 4);

  return (
    <Typography
      {...typographyProps}
      sx={{
        ...(typographyProps?.sx ?? {}),
        display: 'grid',
        overflow: 'hidden',
        cursor: 'pointer',
        alignItems: 'center',
        gridTemplateColumns: 'auto auto 1fr',
      }}
      onClick={
        !hideCopy ? () => window?.navigator?.clipboard?.writeText(address) : undefined
      }
    >
      <span
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {start}
      </span>
      <span>{end}</span>
      {hideCopy && <FileCopy fontSize="small" sx={{ ml: '8px', fontSize: '1rem' }} />}
    </Typography>
  );
};

export default ShortenBitcoinAddress;
