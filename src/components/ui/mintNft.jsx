// src/components/ui/mintNft.js
import { useState, useCallback } from "react";
import { useNftContract } from "./useNftContract";
import { useWallet } from "./WalletConnect";

export function useMintNft() {
  const { address, connectWallet, ensureSepolia } = useWallet();
  const contract = useNftContract();
  const [txHash, setTxHash] = useState(null);

  const mintNft = useCallback(
    async (tokenUri) => {
      if (!address) {
        const addr = await connectWallet();
        if (!addr) throw new Error("Wallet connection cancelled");
      }

      const ok = await ensureSepolia();
      if (!ok) throw new Error("Please switch to Sepolia to mint.");

      if (!contract) throw new Error("Wallet not ready yet. Try again.");

      try {
        // Call the contract function and get a TransactionResponse
        const txResponse = await contract.mintNft(tokenUri);

        // Save the tx hash so we can show a link to Etherscan
        setTxHash(txResponse.hash);

        // Wait for the transaction to be mined
        const receipt = await txResponse.wait();

        return receipt; // You can also return txResponse if you prefer
      } catch (e) {
        const msg = e?.message || "";
        const broken =
          msg.includes("circuit breaker") ||
          msg.includes("isBrokenCircuitError") ||
          e?.code === -32603;

        if (broken) {
          throw new Error(
            "The RPC is rate-limited right now. We added Sepolia with our own RPC — please try again in a moment."
          );
        }
        throw e;
      }
    },
    [address, connectWallet, ensureSepolia, contract]
  );

  return { mintNft, txHash };
}
