import type { Theme } from '@rainbow-me/rainbowkit';
import { darkTheme } from '@rainbow-me/rainbowkit';

import { AppConfig } from '@/config/AppConfig';

const dark = darkTheme();

export const customRainbowKitTheme: Theme = {
  ...dark,
  // blurs: {
  //   modalOverlay: '...',
  // },
  colors: {
    ...dark.colors,
    accentColor: AppConfig.elevation3,
    accentColorForeground: AppConfig.primaryAccent,
    // actionButtonBorder: '...',
    // actionButtonBorderMobile: '...',
    // actionButtonSecondaryBackground: '...',
    // closeButton: '...',
    // closeButtonBackground: '...',
    connectButtonBackground: AppConfig.elevation3,
    // connectButtonBackgroundError: '...',
    // connectButtonInnerBackground: '...',
    connectButtonText: AppConfig.secondaryAccent,
    // connectButtonTextError: '...',
    // connectionIndicator: '...',
    // downloadBottomCardBackground: '...',
    // downloadTopCardBackground: '...',
    // error: '...',
    // generalBorder: '...',
    // generalBorderDim: '...',
    // menuItemBackground: '...',
    // modalBackdrop: '...',
    // modalBackground: '...',
    // modalBorder: '...',
    // modalText: '...',
    // modalTextDim: '...',
    // modalTextSecondary: '...',
    // profileAction: '...',
    // profileActionHover: '...',
    // profileForeground: '...',
    // selectedOptionBorder: '...',
    // standby: '...',
  },
  // fonts: {
  //   body: '...',
  // },
  radii: {
    ...dark.radii,
    //   actionButton: '...',
    connectButton: '20px',
    //   menuButton: '...',
    //   modal: '...',
    //   modalMobile: '...',
  },
  // shadows: {
  //   connectButton: '...',
  //   dialog: '...',
  //   profileDetailsAction: '...',
  //   selectedOption: '...',
  //   selectedWallet: '...',
  //   walletLogo: '...',
  // },
};
