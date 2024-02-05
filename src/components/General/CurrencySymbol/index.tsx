import Image, { StaticImageData } from 'next/image';
import musd from './musd.png';
import usdt from './usdt.png';

const imageMap: Record<string, StaticImageData> = {
  mUSDT: usdt,
  xUSDT: usdt,
  mUSD: musd,
};

const TokenIcon = ({
  token = 'mUSD',
  alt,
  size = 20,
  style,
}: {
  token?: string;
  alt?: string;
  size?: number;
  style?: any;
}) => {
  return (
    <Image
      alt={alt || token}
      height={size}
      width={size}
      src={imageMap[token] ?? musd}
      style={style}
    />
  );
};

export default TokenIcon;
