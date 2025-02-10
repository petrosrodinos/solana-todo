import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Header = () => {
  return (
    <header className="w-full flex justify-end p-4">
      <WalletMultiButton />
    </header>
  );
};

export default Header;
