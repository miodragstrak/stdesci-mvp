import React, { useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';

const App = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleConnect = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        setWalletConnected(true);
        setWalletAddress(response.publicKey.toString());
        console.log('Wallet connected:', response.publicKey.toString());
      } catch (err) {
        console.error('Connection failed:', err);
      }
    } else {
      window.open('https://phantom.app/', '_blank');
    }
  };

  useEffect(() => {
    if (window.solana && window.solana.isPhantom) {
      window.solana.on('connect', (publicKey: PublicKey) => {
        setWalletConnected(true);
        setWalletAddress(publicKey.toString());
      });
      window.solana.on('disconnect', () => {
        setWalletConnected(false);
        setWalletAddress(null);
      });
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', paddingTop: '20%' }}>
      <h1>Welcome to My Solana Platform!</h1>

      {!walletConnected ? (
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
      ) : (
        <>
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              display: 'flex',
              gap: '10px',
            }}
          >
            <button
              onClick={() => setShowProfile(true)}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
              }}
            >
              My Profile
            </button>
          </div>
          <p>Your wallet is connected!</p>
          <p>Wallet Address: {walletAddress}</p>
        </>
      )}

      {showProfile && (
        <div style={{ marginTop: '40px' }}>
          <h2>👤 My Profile</h2>
          <p>Address: {walletAddress}</p>
          <p>Ovde možeš kasnije dodati podatke korisnika, NFT-ove, stake info itd.</p>
        </div>
      )}
    </div>
  );
};

export default App;