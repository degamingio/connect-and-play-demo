# cap-demo
Connect and Play

## Need to
install  Node.js 18.17 or later.

## Getting Started with Next.js

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
# Guide to Playing with Mocked Tokens

This guide will help you get started with MetaMask extension and mocked tokens.

## Getting Started

1. **Install MetaMask Extension**: Add the MetaMask extension to your browser.
   - Follow the setup guide provided by MetaMask. If you're only using it for testing, you can skip the security steps.

2. **Access Test Network**:
   - Visit [chainlist.org](https://chainlist.org/).
   - Search for "XDC".
   - Find "XDC Apothem Network" and click "Add to MetaMask".
   - Approve the request in MetaMask.

Congratulations! You now have access to the test network we are using. 🕺

## Acquiring Mocked Tokens

1. **Send Your Wallet Address**: Forward your wallet address (not your private key! 🚫👂) to your DeGaming contact person.
   - They will send you some TXDCs. 💸💰

2. **Minting mUSD and mUSDT**:
   - With TXDC in your wallet, you can mint mUSD and mUSDT, the tokens used for testing.
   - Go to [https://localhost:3000/bankroll](https://localhost:3000/bankroll).
   - Connect MetaMask via the top right corner.
   - Select the token you need (mUSD, mUSDT).
   - Click "provide liquidity" then "mint test tokens", and approve the action in MetaMask.

You have successfully minted 1000 tokens! 🎉 As long as you have TXDC, you can continue minting.

## Optional: Adding Tokens to MetaMask

If you wish to see mUSD or mUSDT in MetaMask:

1. In MetaMask, click "tokens" then "import token".
2. Paste the token address for the token you want to import.

- **mUSD Address**: `0xb0F5c667e9aB3144cF6b2E9B03805a87955bdC07`
- **mUSDT Address**: `0xfBA6CED88170e86DA9F49902055cF80A62F1AC4a`
