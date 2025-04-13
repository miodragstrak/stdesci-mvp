'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { Balance } from '@/components/Balance';
import { NFTGallery } from '@/components/NFTGallery';

export default function ProfilePage() {
  const { publicKey } = useWallet();

  if (!publicKey) {
    return <div>Please connect your wallet to view profile.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <p>Address: {publicKey.toBase58()}</p>
      <Balance publicKey={publicKey.toBase58()} />
      <NFTGallery publicKey={publicKey.toBase58()} />
    </div>
  );
}