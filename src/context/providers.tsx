'use client';

import { AppConfigProvider } from '@/context/AppConfigContext';
import Web3Providers from '@/context/Web3Context';
import client from '@/libs/apolloClient';
import { BankrollProvider } from '@/state/BankrollContext';
import { OperatorProvider } from '@/state/OperatorContext';
import { SiweUserProvider } from '@/state/SiweUserContext';
import { UserProvider } from '@/state/UserContext';
import theme from '@/styles/Theme';
import '@/styles/global.css';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';
import '@rainbow-me/rainbowkit/styles.css';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <Web3Providers>
        <AppConfigProvider>
          <ApolloProvider client={client}>
            <OperatorProvider>
              <BankrollProvider>
                <SiweUserProvider>
                  <UserProvider>{children}</UserProvider>
                </SiweUserProvider>
              </BankrollProvider>
            </OperatorProvider>
          </ApolloProvider>
        </AppConfigProvider>
      </Web3Providers>
    </ThemeProvider>
  );
};

export default Providers;
