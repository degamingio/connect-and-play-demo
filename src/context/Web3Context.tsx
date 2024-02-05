import Avatar from '@/components/Wallet/Avatar';
import { AppConfig } from '@/config/AppConfig';
import { customRainbowKitTheme } from '@/styles/RainbowKitTheme';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

const rpcOverrides = AppConfig.supportedChains.reduce(
  (acc, c) => ({ ...acc, [c.chain.id]: c.rpcUrl! }),
  {} as Record<number, string>,
);

const { chains, publicClient, webSocketPublicClient } = configureChains(
  AppConfig.supportedChains.map((c) => c.chain),
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: rpcOverrides[chain.id]!,
      }),
    }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : '',
  projectId: process.env.NEXT_PUBLIC_PROJECTID ? process.env.NEXT_PUBLIC_PROJECTID : '',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const Web3Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains} theme={customRainbowKitTheme} avatar={Avatar}>
      {children}
    </RainbowKitProvider>
  </WagmiConfig>
);

export default Web3Providers;
