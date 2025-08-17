import React from "react";
import { motion } from "framer-motion"; // Import motion for animations
import Logo from "../assets/images/logo.webp";
import Progress from "./Progress";
import Questions from "./Questions";
import Options from "./Options";
import Timer from "./Timer";
import Navigation from "./Navigation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function QuizContainer() {
  const navigate = useNavigate();
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
  // useEffect(() => {
  //   // Check if the user is authenticated (check from localStorage)
  //   const isAuthenticated = localStorage.getItem("isAuthenticated");

  //   if (!isAuthenticated) {
  //     // If not authenticated, redirect to authentication page
  //     // navigate("/");
  //   }
  // }, [navigate]);
  return (
    <motion.div
      className="flex flex-col items-center w-full px-4"
      initial={{ opacity: 0, scale: 0.8 }} // Initial state
      animate={{ opacity: 1, scale: 1 }} // End state
      transition={{ duration: 0.8, ease: "easeInOut" }} // Transition properties
    >
      {/* Header: Logo and Timer */}
      <header className="w-full max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.img
          src={Logo}
          alt="Logo"
          className="w-24 h-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <Timer />
      </header>

      {/* Main Quiz Section */}
      <main className="w-full max-w-[600px] mx-auto px-4 overflow-hidden mb-[-10px]">
        <Progress />
        <Questions />
        <div className="w-full max-w-[600px] px-2 mt-[-25px]">
          <Options />
        </div>
      </main>
      <div className="w-full max-w-[600px] px-4 mt-0">
        <Navigation />
      </div>
    </motion.div>
  );
}

export default QuizContainer;
