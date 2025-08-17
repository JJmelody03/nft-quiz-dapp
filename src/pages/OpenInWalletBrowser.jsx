import { motion } from "framer-motion";

export default function OpenInWalletBrowser() {
  const dappUrl = "https://jade-alpaca-383221.netlify.app";
  const metamaskLink = `https://metamask.app.link/dapp/${dappUrl.replace(/^https?:\/\//, "")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-2xl font-semibold mb-2 text-white"
      >
        Open in Wallet Browser
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="text-white text-opacity-80 mb-4 max-w-md"
      >
        You're on mobile, but this app needs to open inside MetaMask,
        Trust Wallet, or Rainbow browser.
      </motion.p>

      <motion.a
        href={metamaskLink}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="px-6 py-2 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition duration-300 shadow-md"
      >
        Open in MetaMask
      </motion.a>
    </motion.div>
  );
}
