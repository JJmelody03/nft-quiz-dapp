import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const useInactivityTimer = ({ active = false, timeout = 10 * 60 * 1000 }) => {
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      // Action after timeout
      localStorage.clear();
      navigate("/", { replace: true });
    }, timeout);
  };

  useEffect(() => {
    if (!active) return;

    const events = ["click", "mousemove", "keydown", "scroll"];

    for (const event of events) {
      window.addEventListener(event, resetTimer);
    }

    resetTimer(); // Start the timer

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      for (const event of events) {
        window.removeEventListener(event, resetTimer);
      }
    };
  }, [active]);
};