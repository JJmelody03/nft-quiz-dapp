import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners"; // Importing the loader
import { useQuestions } from "../components/ui/questionsContext";
import { useUser } from "../components/ui/userContext";


const FailureCard = () => {
  const [isLoading, setIsLoading] = useState(false); // Loading state for retry button
  const { state, dispatch, fetchQuestions } = useQuestions();
  const { user } = useUser();
  const { name } = user;
  const { percentage } = state;
  const navigate = useNavigate();

  // Simulate retry logic after failure
  const handleRetry = async () => {
    setIsLoading(true);

    // Simulate a delay (loading process)
    setTimeout(() => {
      dispatch({ type: "RESET_QUIZ" });
      setIsLoading(false); // Stop loading
      navigate("/quiz"); // Redirect to quiz after retry
      fetchQuestions();
    }, 2000); // Simulated delay
  };

  useEffect(() => {
    // Prevent back navigation
    const handlePopState = () => {
      window.history.go(1);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center font-sans px-4">
      {/* Failure Card Background */}
      <motion.div
        className="relative bg-[#3e0862] border border-[#2D0145] rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md text-center shadow-2xl overflow-hidden flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and offset vertically
        animate={{ opacity: 1, y: 0 }} // Fade and move to normal position
        transition={{ duration: 0.8, ease: "easeInOut" }} // Smooth transition
      >
        {/* Sad Face Emoji */}
        <motion.div
          className="text-[48px] sm:text-[64px] mb-4 z-10 relative text-[#B57BFF]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          ☹️
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-xl sm:text-2xl font-bold text-[#B57BFF] mb-5 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Sorry, {name}
        </motion.h1>

        {/* Score Display */}
        <motion.div
          className="relative flex items-center justify-center mb-6 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="w-36 h-36 rounded-full bg-[#1F1029] flex items-center justify-center relative">
            {/* Glowing Ring */}
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#A259FF,#7A37FF,#A259FF)] p-[3px]">
              <div className="w-full h-full bg-[#1F1029] border-[#5A1B7B] rounded-full flex items-center justify-center">
                {/* Score Content */}
                <div className="relative w-28 sm:w-32 h-28 sm:h-32 rounded-full bg-[#1F1029] flex flex-col items-center justify-center shadow-lg">
                  {/* Glow ring for the score circle */}
                  <div className="absolute w-full h-full rounded-full bg-[#9F56FF] opacity-30 blur-2xl animate-pulse"></div>

                  {/* Score Circle Content */}
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
        </motion.div>

        {/* Eligibility Message */}
        <motion.strong
          className="text-[#e35741] mb-6 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          You’re not eligible to mint the NFT
          <br />
          <span className="text-xs text-[#ffffff]">
            (only first attempt counts)
          </span>
        </motion.strong>

        {/* Retry button */}
        <motion.button
          onClick={handleRetry}
          disabled={isLoading} // Disable while loading
          className={`${
            isLoading ? "bg-[#2a1040]" : "bg-[#7A37FF] hover:bg-[#9B58FF]"
          } text-white font-semibold py-3 px-6 transition-all rounded-xl text-sm sm:text-base z-10 relative shadow-md duration-300 transform hover:scale-105 flex justify-center items-center`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {isLoading ? (
            <RingLoader
              size={24}
              color="#ffffff"
              loading={isLoading}
              className="mx-auto"
            />
          ) : (
            "Retry Quiz"
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FailureCard;
