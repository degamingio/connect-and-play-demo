import type { AvatarComponent } from '@rainbow-me/rainbowkit';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

const Avatar: AvatarComponent = ({ address, ensImage, size }) => {
  return ensImage ? (
    <img
      src="ensImage"
      width={size}
      height={size}
      alt="avatar"
      style={{ borderRadius: 999 }}
    />
  ) : (
    <Jazzicon diameter={size} seed={jsNumberForAddress(address)} />
  );
};

export default Avatar;
