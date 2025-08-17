import CenteredLayout from "../components/ui/CenteredLayout";
import { useQuestions } from "../components/ui/QuestionsContext";
import FailureCard from "./FailureCard";
import SuccessCard from "./SucessCard";
import Logo from "../assets/images/logo.webp";

function ResultScreen() {
  const { state } = useQuestions();
  const { percentage } = state;

  return (
    <div className="relative min-h-screen">
      {/* Logo absolutely positioned at the top-left */}
      <img
        src={Logo}
        alt="Logo"
        className="absolute top-4 left-4 w-24 h-auto sm:w-32 md:w-40 lg:w-32" // Responsive logo size
      />

      {/* Content centered with flex */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mb-[25px]">
          {/* Display success or failure card based on percentage */}
          {percentage >= 80 ? <SuccessCard /> : <FailureCard />}
        </div>
      </div>
    </div>
  );
}

export default ResultScreen;
