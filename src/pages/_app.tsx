import { WalletProvider } from '@solana/wallet-adapter-react';  // proveri tačan import

function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
}

export default MyApp;