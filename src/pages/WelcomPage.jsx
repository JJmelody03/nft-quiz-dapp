import { useEffect, useState } from "react";
import { useUser } from "../components/ui/userContext";
import CenteredLayout from "../components/ui/CenteredLayout";
import { useQuestions } from "../components/ui/QuestionsContext";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import Logo from "../assets/images/logo.webp";
import useLocalStorage from "../components/ui/useLocalStorage";
import { useWallet } from "../components/ui/WalletConnect";

function WelcomePage() {
  const { address, connectWallet, setAddress } = useWallet();
  const { user } = useUser();
  const { state } = useQuestions();
  const { questions } = state;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Store user.name in localStorage
  const [storedName, setStoredName] = useLocalStorage("userName", "");

  useEffect(() => {
    if (user?.name) setStoredName(user.name);
  }, [user?.name, setStoredName]);

  // --- tiny helper: bail out if provider call hangs ---
  const withTimeout = (promise, ms, label = "op") =>
    Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`${label}_timeout`)), ms)
      ),
    ]);

  // Single source of truth for wallet state
  async function refreshWalletState() {
    if (
      typeof window === "undefined" ||
      typeof window.ethereum === "undefined"
    ) {
      setAddress?.(null);
      localStorage.removeItem("walletAddress");
      return { ok: false, reason: "no_wallet" };
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const current = accounts?.[0] || null;

      if (!current) {
        setAddress?.(null);
        localStorage.removeItem("walletAddress");
        return { ok: false, reason: "locked_or_disconnected" };
      }

      setAddress?.(current);
      localStorage.setItem("walletAddress", JSON.stringify(current));
      return { ok: true, address: current };
    } catch (e) {
      console.error("refreshWalletState failed:", e);
      return { ok: false, reason: "rpc_error" };
    }
  }

  const handleStartQuiz = async () => {
    setIsLoading(true);
    try {
      // If wallet seems connected in state but user uninstalled/locked,
      // ethereum may still exist and hang. We timeout and fail gracefully.
      const result = await withTimeout(
        refreshWalletState(),
        7000, // 8s: adjust if you like
        "refresh_wallet"
      );

      if (!result.ok) {
        alert("Wallet not connected. Please connect your wallet first.");
        navigate("/validation");
        return;
      }

      navigate("/quiz");
    } catch (err) {
      console.error(err);
      // If we hit a timeout or error, treat as disconnected and move on
      alert("Couldn't verify wallet. Please reconnect.");
      // Clean stale state so UI doesn't lie
      setAddress?.(null);
      localStorage.removeItem("walletAddress");
      navigate("/validation");
    } finally {
      setIsLoading(false); // ✅ never hangs
    }
  };

  const displayName = storedName || user?.name || "Guest";

  return (
    <CenteredLayout>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6 px-4 sm:px-6 md:px-8">
        <img
          src={Logo}
          alt="Logo"
          className="absolute top-4 left-4 w-24 h-auto sm:w-32 md:w-40 lg:w-32"
        />

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-codystar text-center">
          Welcome, {displayName}
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white text-center">
          Earn your Web3 Certification NFT
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-white text-center">
          by acing these {questions.length} questions
        </p>

        <button
          onClick={handleStartQuiz}
          disabled={isLoading}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg sm:text-xl w-full max-w-[200px] flex items-center justify-center"
        >
          {isLoading ? <RingLoader size={24} color="#ffffff" /> : "Start Quiz"}
        </button>
      </div>
    </CenteredLayout>
  );
}

export default WelcomePage;
