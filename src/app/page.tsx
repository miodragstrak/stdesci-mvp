'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const router = useRouter();

  const handleConnect = async () => {
    const provider = (window as any).solana;
    if (provider?.isPhantom) {
      try {
        const resp = await provider.connect();
        setWalletAddress(resp.publicKey.toString());
        setWalletConnected(true);
        router.push('/profile');
      } catch (err) {
        console.error('Wallet connection error:', err);
      }
    } else {
      window.open('https://phantom.app/', '_blank');
    }
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '20%' }}>
      <h1>Welcome to Solana MVP Platform</h1>
      <button
        onClick={handleConnect}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          fontSize: '16px',
        }}
      >
        Connect Wallet
      </button>
    </div>
  );
}