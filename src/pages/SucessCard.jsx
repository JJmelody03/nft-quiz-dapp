import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../components/ui/QuestionsContext";
import { useUser } from "../components/ui/userContext";
import { RingLoader } from "react-spinners";
import { useCrossTabSync } from "../components/ui/useCrossTabSync";
import { useMintNft } from "../components/ui/mintNft";
function SuccessCard() {
  const [loading, setLoading] = useState(false);
  const [minted, setMinted] = useState(() => {
    return localStorage.getItem("minted") === "true";
  });
  const [justMinted, setJustMinted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useCrossTabSync("minted", (value) => {
    setMinted(value === "true");
    if (value === "true") setJustMinted(false);
  });

  const navigate = useNavigate();
  const { state, dispatch, fetchQuestions } = useQuestions();
  const { score, percentage } = state;
  const { user } = useUser();
  const { name } = user;
  const { mintNft } = useMintNft();

  const [txHash, setTxHash] = useState(null);

const handleMint = async () => {
  if (minted) return;
  setLoading(true);

  try {
    const metadataUri =
      "https://bafybeihiunsnswm4hhroy5frsuegg4tduqnkviwigi6ymizbqti5dyizwm.ipfs.dweb.link?filename=certificate.json";

    // ✅ Mint using the hook
    const tx = await mintNft(metadataUri);

    // Save tx hash (already set in the hook, but safe to set here too)
    setTxHash(tx.hash);

    localStorage.setItem("minted", "true");
    setMinted(true);
    setJustMinted(true);
    setShowConfetti(true);

    // ✅ Alert for MVP
    alert("Mint successful! Check your wallet for the NFT.");

    // Optional: also show etherscan link if you want
    // alert(`Mint successful! View transaction: https://sepolia.etherscan.io/tx/${tx.hash}`);
  } catch (error) {
    console.error(error);
    alert("Mint failed");
  } finally {
    setLoading(false);
  }
};




  const handleRetakeQuiz = () => {
    localStorage.removeItem("quizTimer");
    localStorage.removeItem("quizState");
    dispatch({ type: "RESET_QUIZ" });
    if (fetchQuestions) fetchQuestions();
    navigate("/welcome");
  };

  useEffect(() => {
    const handlePopState = () => {
      window.history.go(1);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => {
        setShowConfetti(false);
      }, 7000);
    }
  }, [showConfetti]);

  const getMintStatusMessage = () => {
    if (justMinted) {
      return "Your NFT has been successfully minted!";
    } else if (minted) {
      return "You have already minted your NFT.";
    } else {
      return "You’re eligible to mint your Certification NFT";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <motion.div
        className="relative bg-[#3e0862] border border-[#2D0145] rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md text-center shadow-2xl overflow-hidden flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 sm:w-80 h-60 sm:h-80 bg-[#B56CFF33] rounded-full blur-[100px] opacity-60 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        ></motion.div>

        <motion.div
          className="text-[48px] sm:text-[64px] mb-4 z-10 relative drop-shadow-[0_0_15px_rgba(255,221,0,0.6)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          🏆
        </motion.div>

        <motion.h1
          className="text-xl sm:text-2xl font-bold text-[#B57BFF] mb-2 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          CONGRATULATIONS, {name}!
        </motion.h1>

        <p className="text-[#D1C7E0] mb-6 relative z-10">
          You’ve completed the Web3 Certification Quiz
        </p>

        <div className="relative flex items-center justify-center mb-6 z-10">
          <div className="w-36 h-36 rounded-full bg-[#1F1029] flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#A259FF,#7A37FF,#A259FF)] p-[3px]">
              <div className="w-full h-full bg-[#1F1029] border-[#5A1B7B] rounded-full flex items-center justify-center">
                <div className="relative w-28 sm:w-32 h-28 sm:h-32 rounded-full bg-[#1F1029] flex flex-col items-center justify-center shadow-lg">
                  <div className="absolute w-full h-full rounded-full bg-[#9F56FF] opacity-30 blur-2xl animate-pulse"></div>
                  <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D0B7FF] mb-1 z-10">
                    Your Score
                  </span>
                  <span className="text-lg sm:text-3xl font-extrabold text-[#F5DFFF] z-10">
                    {percentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.p
          className="text-[#00E296] font-medium mt-4 mb-6 z-10 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {getMintStatusMessage()}
        </motion.p>
       

        {minted && (
          <motion.button
            onClick={handleRetakeQuiz}
            className="bg-[#FF8C00] hover:bg-[#FFA726] text-white py-2 px-5 rounded-md mt-2 text-sm sm:text-base z-10 relative transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Retake Quiz (No NFT)
          </motion.button>
        )}

        <motion.button
          onClick={handleMint}
          disabled={minted}
          className={`${
            minted
              ? "bg-[#28A745] text-white cursor-not-allowed"
              : "bg-[#7A37FF] hover:bg-[#9B58FF] text-white"
          } transition-all py-3 px-6 rounded-xl text-sm sm:text-base font-semibold z-10 relative shadow-md duration-300 transform hover:scale-105 mt-4`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span>Minting</span>
              <RingLoader size={24} color="#ffffff" className="mr-2" />
            </div>
          ) : minted ? (
            "Minted"
          ) : (
            "Mint NFT"
          )}
        </motion.button>

        {process.env.NODE_ENV !== "production" && (
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="mt-6 text-xs text-red-400 hover:text-red-200 underline"
          >
            🔄
          </button>
        )}
      </motion.div>
    </div>
  );
}

export default SuccessCard;
