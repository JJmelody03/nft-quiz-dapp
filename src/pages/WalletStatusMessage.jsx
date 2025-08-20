import { useWallet } from "../components/ui/WalletConnect";
import { motion } from "framer-motion";
import { useState } from "react";

export default function WalletStatusMessage() {
  const { fallbackMode } = useWallet();
  const [copied, setCopied] = useState(false);
  if (!fallbackMode) return null;

  const isMobile = fallbackMode === "mobile";
  const dappUrl = "https://chaindustry-certify.netlify.app";
  const metamaskLink = `https://metamask.app.link/dapp/${dappUrl.replace(
    /^https?:\/\//,
    ""
  )}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dappUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] rounded-2xl p-8 max-w-sm w-full text-center text-white shadow-xl border border-white/10"
      >
        <h2 className="text-2xl font-bold tracking-tight mb-3">
          {isMobile ? "Open in Wallet Browser" : "No Crypto Wallet Detected"}
        </h2>

        <p className="text-sm text-white/70 leading-relaxed mb-6">
          {isMobile
            ? "You’re on mobile. Please open this app inside a Web3 wallet browser like MetaMask or Trust Wallet."
            : "Please install a Web3 wallet like MetaMask or Trust Wallet to continue."}
        </p>

        <a
          href={isMobile ? metamaskLink : "https://metamask.io/download/"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full gap-2 bg-[#9d174d] hover:bg-[#be185d] transition text-white font-semibold py-3 px-6 rounded-lg text-sm mb-4 shadow-md"
        >
          {isMobile ? "Open in MetaMask" : "Install MetaMask"}
        </a>

        {isMobile && (
          <motion.button
            onClick={copyToClipboard}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-3 px-6 bg-white/10 text-white text-sm rounded-lg border border-white/10 hover:bg-white/20 transition mb-4"
          >
            {copied ? "Link copied!" : "Copy App Link"}
          </motion.button>
        )}

        <motion.button
          onClick={() => window.location.reload()}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="w-full py-3 px-6 bg-white/10 text-white text-sm rounded-lg border border-white/10 hover:bg-white/20 transition"
        >
          Return to Home
        </motion.button>
      </motion.div>
    </div>
  );
}
