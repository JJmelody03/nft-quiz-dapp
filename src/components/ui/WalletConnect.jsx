// src/context/Walletcontext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { useNavigate } from "react-router-dom";

const Walletcontext = createContext();
const SEPOLIA_CHAIN_ID_HEX = "0xaa36a7";

// Store your Infura key in an env var for safety if you can (Vite example)
const INFURA_KEY =
  import.meta?.env?.VITE_INFURA_KEY || "2d65c67b73bb4ef494c64e2fabfb14bd";
const SEPOLIA_RPC = `https://sepolia.infura.io/v3/${INFURA_KEY}`;

export function Walletprovider({ children }) {
  const [address, setAddress] = useState(null);
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [fallbackMode, setFallbackMode] = useState(null);
  const navigate = useNavigate();

  // ✅ Auto-connect if wallet is already connected
  useEffect(() => {
    if (window.ethereum) {
      const providerInstance = new BrowserProvider(window.ethereum);
      setProvider(providerInstance);
      providerInstance
        .getSigner()
        .then(async (sgn) => {
          const addr = await sgn.getAddress();
          setSigner(sgn);
          setAddress(addr);
        })
        .catch(() => {});
    }
  }, []);

  const connectWallet = async () => {
    const isEthereumAvailable = typeof window.ethereum !== "undefined";

    if (!isEthereumAvailable) {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const mode = isMobile ? "mobile" : "desktop";
      setFallbackMode(mode);
      localStorage.setItem("fallbackMode", mode);
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const providerInstance = new BrowserProvider(window.ethereum);
      const signerInstance = await providerInstance.getSigner();
      const walletAddress = await signerInstance.getAddress();

      setProvider(providerInstance);
      setSigner(signerInstance);
      setAddress(walletAddress);

      return walletAddress;
    } catch (error) {
      console.error(error);
    }
  };

  const ensureSepolia = async () => {
    if (!window.ethereum) return false;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CHAIN_ID_HEX }],
      });
      return true;
    } catch (switchErr) {
      if (switchErr?.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: SEPOLIA_CHAIN_ID_HEX,
                chainName: "Sepolia (App)",
                rpcUrls: [SEPOLIA_RPC],
                nativeCurrency: {
                  name: "SepoliaETH",
                  symbol: "SepoliaETH",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              },
            ],
          });
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: SEPOLIA_CHAIN_ID_HEX }],
          });
          return true;
        } catch (addErr) {
          console.error("Failed to add Sepolia", addErr);
          return false;
        }
      }
      console.error("Failed to switch network", switchErr);
      return false;
    }
  };

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setAddress(null);
        setSigner(null);
        setProvider(null);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("walletAddress");
        alert("Wallet disconnected. You'll need to reconnect.");
        setTimeout(() => {
          navigate("/");
        }, 100);
      } else {
        setAddress(accounts[0]);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, [navigate]);

  return (
    <Walletcontext.Provider
      value={{
        address,
        signer,
        provider,
        connectWallet,
        ensureSepolia,
        fallbackMode,
      }}
    >
      {children}
    </Walletcontext.Provider>
  );
}

export const useWallet = () => useContext(Walletcontext);
