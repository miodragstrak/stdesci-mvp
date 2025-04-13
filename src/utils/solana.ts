import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection("https://api.mainnet-beta.solana.com", 'confirmed');

// Tipizacija za dobijanje balansa
export const getSolanaBalance = async (publicKey: string): Promise<number> => {
  const balance = await connection.getBalance(new PublicKey(publicKey));
  return balance;
};

// Ostale funkcionalnosti mogu se dodavati ovde (mintanje, stake, i slično)