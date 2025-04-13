'use client';

import { useEffect, useState } from 'react';
import { Metaplex } from '@metaplex-foundation/js';
import { Connection, PublicKey } from '@solana/web3.js';
import { SOLANA_RPC_ENDPOINT } from '@/lib/network';

type NFTGalleryProps = {
  publicKey: string;
};

export const NFTGallery = ({ publicKey }: NFTGalleryProps) => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      const connection = new Connection(SOLANA_RPC_ENDPOINT);
      const metaplex = new Metaplex(connection);
      const owner = new PublicKey(publicKey);
      try {
        const foundNFTs = await metaplex.nfts().findAllByOwner({ owner });
        setNfts(foundNFTs);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      } finally {
        setLoading(false);
      }
    };

    if (publicKey) fetchNFTs();
  }, [publicKey]);

  if (loading) return <p>Loading your NFTs...</p>;

  if (!nfts.length) {
    return (
      <div>
        <h3 className="text-lg font-bold mb-2">You don’t own any NFTs yet.</h3>
        <p className="mb-4">Here are some sample NFTs to inspire you:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {['https://placekitten.com/200/200', 'https://placebear.com/200/200', 'https://picsum.photos/200'].map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt="Sample NFT"
              className="rounded-lg shadow-md"
              width={200}
              height={200}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">My NFTs:</h3>
      <ul>
        {nfts.map((nft, idx) => (
          <li key={idx}>{nft.name}</li>
        ))}
      </ul>
    </div>
  );
};