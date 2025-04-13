'use client';

import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { SOLANA_RPC_ENDPOINT } from '@/lib/network';

type BalanceProps = {
  publicKey: string;
};

export const Balance = ({ publicKey }: BalanceProps) => {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const connection = new Connection(SOLANA_RPC_ENDPOINT);
      try {
        const lamports = await connection.getBalance(new PublicKey(publicKey));
        setBalance(lamports / 1e9); // Pretvaramo iz lamporta u SOL
      } catch (error) {
        console.error('Greška pri dohvatu balansa:', error);
      }
    };

    if (publicKey) fetchBalance();
  }, [publicKey]);

  return (
    <div>
      <strong>Balance:</strong>{' '}
      {balance !== null ? `${balance.toFixed(3)} SOL` : 'Loading...'}
    </div>
  );
};