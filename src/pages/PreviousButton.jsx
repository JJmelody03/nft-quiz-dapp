import { useQuestions } from "../components/ui/QuestionsContext";

function PreviousButton() {
  const { state, dispatch } = useQuestions();

  const previousQuestion = () => {
    dispatch({ type: "PREV_QUESTION" });
  };

  return (
    <div className="mt-6 flex justify-end w-full max-w-2xl px-4 sm:px-6">
      <button className="btn btn-ui" onClick={previousQuestion}>
        Prev
      </button>
    </div>
  );
}

export default PreviousButton;
