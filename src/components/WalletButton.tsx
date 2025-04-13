import React from 'react';

const WalletButton = ({ onConnect }: { onConnect: () => void }) => {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      const provider = (window as any).solana;

      if (provider && provider.isPhantom) {
        onConnect(); // ako postoji Phantom, pozovi povezivanje
      } else {
        // ako ne postoji Phantom, otvori Phantom sajt
        window.open('https://phantom.app/', '_blank');
      }
    }
  };

  return (
    <button
      onClick={handleClick}
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
  );
};

export default WalletButton;