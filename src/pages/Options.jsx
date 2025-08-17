import { useQuestions } from "../components/ui/questionsContext";

function Options() {
  const { state, dispatch } = useQuestions();
  const useCurrentQuestion = () => {
    const { questions, currentIndex } = state;
    return questions.length > 0 ? questions[currentIndex] : null;
  };

  const currentQuestion = useCurrentQuestion();
  if (!currentQuestion) return null;

  const optionIsSelected = (index) => {
    const { selectedAnswers, currentIndex } = state;
    return selectedAnswers[currentIndex] === index;
  };

  return (
    <div className="px-4 md:py-2.5 leading-snug ">
      {currentQuestion.options.map((option, i) => (
        <button
          key={i}
          title={option}
          onClick={() => {
            dispatch({ type: "SELECT_ANSWER", payload: i });
            dispatch({ type: "FINISH_QUIZ" });
          }}
          className={`
            btn btn-option truncate w-full
            !text-[clamp(1.3rem,1.8vw,1.3rem)]
            text-left ${optionIsSelected(i) ? "selected" : ""}
            `}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
