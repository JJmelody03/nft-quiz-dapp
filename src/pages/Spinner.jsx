import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import CenteredLayout from "../components/ui/CenteredLayout";

function Spinner() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      // Your code to run after timeout
      navigate("/validation");
    }, 3500);

    // Cleanup
    return () => clearTimeout(timer);
  }, []);

  return (
    <CenteredLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-6">
        {/* Loader */}
        <SyncLoader
          color="#9C70ED"
          size={20}
          margin={6}
          speedMultiplier={0.8}
        />

        {/* Text with responsive font sizes */}
        <p className="quiz-header text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center">
          Initializing Proof of Knowledge Consensus Protocol...
        </p>
      </div>
    </CenteredLayout>
  );
}

export default Spinner;
