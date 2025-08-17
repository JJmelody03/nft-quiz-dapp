import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../components/ui/QuestionsContext";
import { RingLoader } from "react-spinners"; // Importing the loader

function Navigation() {
  const { state, dispatch } = useQuestions();
  const { currentIndex, questions } = state;
  const navigate = useNavigate();

  // State to track loading state for the "Finish" button
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    dispatch({ type: "SUBMIT_ANSWER" });
  };

  const handlePrev = () => {
    dispatch({ type: "PREV_QUESTION" });
  };

  const handleFinish = () => {
    setIsLoading(true); // Start loading animation

    // Simulate some delay before navigating to the results page
    setTimeout(() => {
      navigate("/results");
      dispatch({ type: "FINISH_QUIZ" });
    }, 2000); // Adjust the time for loading animation
  };

  return (
    <div className="w-full max-w-[600px] mx-auto flex justify-between px-4 mb-2 mt-5">
      {currentIndex > 0 ? (
        <button
          onClick={handlePrev}
          className="btn btn-ui ml-[10px] text-[clamp(1.1rem,2vw,1.5rem)] px-6 py-3 min-w-[90px] sm:min-w-[100px]"
        >
          Prev
        </button>
      ) : (
        <div /> // empty div to hold space when Prev is hidden
      )}

      {currentIndex < questions.length - 1 ? (
        <button
          onClick={handleNext}
          className="btn btn-ui ml-[10px] text-[clamp(1.1rem,2vw,1.5rem)] px-6 py-3 min-w-[90px] sm:min-w-[100px]"
        >
          Next
        </button>
      ) : (
        <button
          onClick={handleFinish}
          disabled={isLoading} // Disable the button while loading
          className="btn btn-ui ml-[10px] text-[clamp(1.1rem,2vw,1.5rem)] px-6 py-3 min-w-[90px] sm:min-w-[100px] flex justify-center items-center relative"
        >
          {isLoading ? (
            <RingLoader
              size={24}
              color="#00e0ff"
              loading={isLoading}
              className="absolute inset-0 mx-auto"
            />
          ) : (
            "Finish"
          )}
        </button>
      )}
    </div>
  );
}

export default Navigation;
