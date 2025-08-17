import { useEffect, useState } from "react";
import { useQuestions } from "../components/ui/questionsContext";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../components/ui/useLocalStorage";
import { useCrossTabSync } from "../components/ui/useCrossTabSync";

const FULL_DASH_ARRAY = 283; // Circle circumference

function CircularTimer({ duration = 60 }) {
  const [timeLeft, setTimeLeft] = useLocalStorage("quizTimer", duration);
  const navigate = useNavigate();
  const { state, dispatch } = useQuestions();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const strokeDashoffset =
    FULL_DASH_ARRAY - (FULL_DASH_ARRAY * timeLeft) / duration;

  const timeUp = () => {
    dispatch({ type: "FINISH_QUIZ" });
    navigate("/results");
  };
  // ✅ Sync timer across tabs
  useCrossTabSync("quizTimer", (value) => {
    if (value) {
      const parsed = parseInt(value, 10);
      if (!isNaN(parsed)) setTimeLeft(parsed);
    }
  });

  
  useEffect(() => {
    if (timeLeft <= 0) {
      timeUp();
    }
    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="relative w-25 h-25">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="rgba(217, 217, 217, 0.2)"
          strokeWidth="7"
          stroke="rgba(217, 217, 217, 0.2)"
          fill="none"
          cx="50"
          cy="50"
          r="35"
        />
        <circle
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
          strokeWidth="7"
          strokeDasharray={FULL_DASH_ARRAY}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="#00e0ff"
          fill="none"
          cx="50"
          cy="50"
          r="35"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
        {minutes < 10 && "0"}
        {minutes}:{seconds < 10 && "0"}
        {seconds}
      </div>
    </div>
  );
}

export default CircularTimer;
