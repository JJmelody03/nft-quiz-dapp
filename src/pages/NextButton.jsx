import { useQuestions } from "../components/ui/questionsContext";

function NextButton() {
  const { state, dispatch } = useQuestions();

  const nextQuestion = () => {
    dispatch({ type: "SUBMIT_ANSWER" });
  };

  return (
    <div className="mt-6 flex justify-end w-full max-w-2xl px-4 sm:px-6">
      <button className="btn btn-ui" onClick={nextQuestion}>
        Next
      </button>
    </div>
  );
}

export default NextButton;
