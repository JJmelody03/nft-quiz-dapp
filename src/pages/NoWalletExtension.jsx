import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NoWalletExtension() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-3xl font-bold text-white mb-3"
      >
        No Crypto Wallet Detected
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="text-white text-opacity-80 mb-6 max-w-md"
      >
        This app works with any Ethereum-compatible browser extension. Install
        MetaMask or a similar wallet to continue.
      </motion.p>

      <motion.a
        href="https://metamask.io/download/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
      >
        Install MetaMask
      </motion.a>

      <motion.button
        onClick={() => window.location.reload()}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className="mt-4 px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition"
      >
        Try Again
      </motion.button>
    </motion.div>
  );
}
