// Apply your own styles here.
import { createTheme, lighten } from '@mui/material/styles';

import { AppConfig } from '@/config/AppConfig';

// This is the theme for the app
const theme = createTheme({
  typography: {
    fontFamily: AppConfig.fontFamily.style.fontFamily,
    fontWeightBold: 700,
    fontWeightMedium: 600,
    fontWeightRegular: 400,
    fontWeightLight: 200,
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 'bold',
      lineHeight: '150%',
    },
    allVariants: {
      color: AppConfig.primaryContent,
    },
    h2: {
      fontSize: '3.5rem',
      letterSpacing: '2.1px',
      fontWeight: 'bold',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: '266%',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: '20px',
    },
    body1: {
      fontSize: '1rem',
      color: AppConfig.secondaryContent,
    },
    caption: {
      color: AppConfig.secondaryContent,
      fontSize: '0.75rem',
      lineHeight: '140%',
    },
  },
  app: {
    fontFamily: AppConfig.fontFamily.style.fontFamily,
    fontFamilyAccent: AppConfig.fontFamilyAccent.style.fontFamily,

    logoWidth: AppConfig.logoWidth,
    logoHeight: AppConfig.logoHeight,
    mobileLogoHeight: AppConfig.mobileLogoHeight,
    headerMinHeight: AppConfig.headerMinHeight,
    leftDrawerWidth: AppConfig.leftDrawerWidth,

    elevation1: AppConfig.elevation1,
    elevation2: AppConfig.elevation2,
    elevation3: AppConfig.elevation3,
    bgDefault: AppConfig.bgDefault,
    primaryAccent: AppConfig.primaryAccent,
    primaryContent: AppConfig.primaryContent,
    secondaryContent: AppConfig.secondaryContent,
    secondaryAccent: AppConfig.secondaryAccent,
    tertiaryAccent: AppConfig.tertiaryAccent,
    bannerBg: AppConfig.bannerBg,
    buttonTextColor: AppConfig.buttonTextColor,
    buttonTextColorDark: AppConfig.buttonTextColorDark,

    hideFooter: AppConfig.hideFooter,
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: AppConfig.headerMinHeight,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: AppConfig.bgDefault,
          margin: 0,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        sx: {
          textTransform: 'capitalize',
          fontSize: '16px',
          padding: '8px 16px',
          fontWeight: '600',
        },
      },
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            background: AppConfig.bgDefault,
            color: AppConfig.secondaryContent,
          },
        },
      },
    },
    // MuiTableCell: {
    //   styleOverrides: {
    //     root: {
    //       color: AppConfig.secondaryContent,
    //       backgroundColor: AppConfig.elevation3,
    //     },
    //   },
    // },
    // MuiTableContainer: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: '20px',
    //     },
    //   },
    // },
  },
});

const custom = createTheme(theme, {
  palette: {
    background: {
      paper: AppConfig.elevation1,
      default: AppConfig.bgDefault,
    },
    success: theme.palette.augmentColor({
      color: { main: AppConfig.secondaryAccent },
    }),
    primary: theme.palette.augmentColor({
      color: {
        main: AppConfig.primaryAccent,
        dark: AppConfig.primaryAccent,
      },
    }),
    secondary: theme.palette.augmentColor({
      color: {
        main: AppConfig.elevation3,
        dark: lighten(AppConfig.elevation3, 0.02),
      },
    }),
  },
});

type AppPropTheme = {
  fontFamily: string;
  fontFamilyAccent: string;
  logoWidth: number;
  logoHeight: number;
  mobileLogoHeight: number;
  headerMinHeight: number | string;
  leftDrawerWidth: number;
  hideFooter?: boolean;

  elevation1: string;
  elevation2: string;
  elevation3: string;
  bgDefault: string;
  primaryContent: string;
  primaryAccent: string;
  secondaryContent: string;
  secondaryAccent: string;
  tertiaryAccent: string;
  bannerBg: string;
  buttonTextColor: string;
  buttonTextColorDark: string;
};

declare module '@mui/material/styles' {
  // fix the type error when calling `createTheme()` with a custom theme option
  interface ThemeOptions {
    app?: AppPropTheme;
  }
  interface Theme {
    app?: AppPropTheme;
  }
}

export default custom;
