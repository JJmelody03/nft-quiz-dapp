import { useQuestions } from "../components/ui/QuestionsContext";

function Questions() {
  const { state } = useQuestions();

  const useCurrentQuestion = () => {
    const { questions, currentIndex } = state;
    return questions.length > 0 ? questions[currentIndex] : null;
  };

  const currentQuestion = useCurrentQuestion();

  if (!currentQuestion) return <p>Loading...</p>;

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 ">
      <h4 className="text-white text-xl sm:text-2xl font-bold text-center leading-snug max-w-[90%] mx-auto">
        {currentQuestion.question}
      </h4>
    </div>
  );
}

export default Questions;
