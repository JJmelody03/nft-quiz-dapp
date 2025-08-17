import { useQuestions } from "../components/ui/questionsContext";

function Progress() {
  const { state } = useQuestions();
  const { questions, currentIndex } = state;

  return (
    <header className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-4 text-center space-y-4">
      <progress
        max={questions.length}
        value={currentIndex + 1}
        className="w-full h-3 rounded-md overflow-hidden"
      />

      <div className="text-white text-sm sm:text-base font-medium text-center">
        Question: {currentIndex + 1} / {questions.length}
      </div>
    </header>
  );
}

export default Progress;
