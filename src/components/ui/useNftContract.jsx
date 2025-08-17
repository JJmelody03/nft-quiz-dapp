import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallet } from "./WalletConnect";

const CONTRACT_ADDRESS = "0x5b0Dd0afAacF25fEC764511892AE5fDC76bD6665";

export function useNftContract() {
  const { signer } = useWallet();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (!signer) return;

    const loadContract = async () => {
      try {
        const res = await fetch("/ChaindustryABI.json");
        const data = await res.json();

        // Handle both JSON structures
        const abi = data.abi || data;

        const nftContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
        setContract(nftContract);
      } catch (err) {
        console.error("Failed to load contract:", err);
      }
    };

    loadContract();
  }, [signer]);

  return contract;
}
