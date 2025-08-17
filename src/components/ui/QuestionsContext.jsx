import {
  useEffect,
  useState,
  useContext,
  createContext,
  useReducer,
} from "react";
import { useCrossTabSync } from "./useCrossTabSync";

const QuestionsContext = createContext();
const initialState = {
  questions: [],
  currentIndex: 0,
  selectedAnswers: [], // the current selection (index of option)
  answers: [], // array of { questionIndex, selectedOption }
  score: 0, // total score, recalculated on every submission
  percentage: 0,
  isLoading: true,
  isFinished: false,
  reviewMode: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
      };
    case "SELECT_ANSWER": {
      const newSelectedAnswers = [...state.selectedAnswers];
      newSelectedAnswers[state.currentIndex] = action.payload;
      return {
        ...state,
        selectedAnswers: newSelectedAnswers,
      };
    }
    case "RESET_SELECTED_ANSWER": {
      // Reset the selected answer for the current question
      const resetSelectedAnswers = [...state.selectedAnswers];
      resetSelectedAnswers[state.currentIndex] = null;
      return {
        ...state,
        selectedAnswers: resetSelectedAnswers,
      };
    }
    case "SUBMIT_ANSWER":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };

    case "PREV_QUESTION":
      return {
        ...state,
        currentIndex: state.currentIndex - 1,
      };

    case "FINISH_QUIZ": {
      const score = state.selectedAnswers.reduce((total, selected, index) => {
        const correctOption = state.questions[index].correctOption;
        if (selected === correctOption) {
          return total + state.questions[index].points;
        }
        return total;
      }, 0);

      const totalPoints = state.questions.reduce((sum, q) => sum + q.points, 0); // Sum of all question points
      const percentage = (score / totalPoints) * 100; // Calculate percentage
      console.log(totalPoints, percentage);
      return {
        ...state,
        score,
        percentage, // Add the calculated percentage here
        isFinished: true, // Mark the quiz as finished
      };
    }

    case "RESET_QUIZ":
      localStorage.removeItem("quizTimer");
      localStorage.removeItem("quizState");
      return {
        ...initialState, // if you define initialState outside
        isLoading: false, // or whatever you need to keep
      };
    case "RESET_ALL": {
      localStorage.removeItem("quizState");
      return initialState;
    }
    case "TOGGLE_REVIEW_MODE":
      return {
        ...state,
        reviewMode: !state.reviewMode, // Toggle review mode
      };
    case "LOAD_STATE_FROM_STORAGE":
      return action.payload;
    default:
      return state;
  }
}

export const QuestionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const saved = localStorage.getItem("quizState");
    return saved ? JSON.parse(saved) : initial;
  });

const fetchQuestions = async () => {
  try {
    const response = await fetch("/questions.json"); // fetch from public folder
    if (!response.ok) throw new Error("Failed to fetch questions");
    const data = await response.json();

    // If your JSON is structured as { questions: [...] }, extract the array
    const questionsArray = data.questions || data;

    // Dispatch to reducer so state.questions gets populated
    dispatch({ type: "SET_QUESTIONS", payload: questionsArray });

    console.log("Questions loaded:", questionsArray);
  } catch (error) {
    console.error(error);
  }
};
  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    localStorage.setItem("quizState", JSON.stringify(state));
  }, [state]);

  useCrossTabSync("quizState", (value) => {
    if (value) {
      const parsed = JSON.parse(value);
      dispatch({ type: "LOAD_STATE_FROM_STORAGE", payload: parsed });
    }
  });

  return (
    <QuestionsContext.Provider value={{ state, dispatch, fetchQuestions }}>
      {children}
    </QuestionsContext.Provider>
  );
};
export const useQuestions = () => {
  return useContext(QuestionsContext);
};
