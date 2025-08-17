import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound404() {
  const navigate = useNavigate();
  const [redirectPath, setRedirectPath] = useState("/welcome");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const quizState = JSON.parse(localStorage.getItem("quizState"));
    const minted = localStorage.getItem("minted") === "true";

    if (!isAuthenticated) {
      setRedirectPath("/validation"); // or "/"
    } else if (quizState && !quizState.completed) {
      setRedirectPath("/quiz");
    } else if (quizState && quizState.completed) {
      setRedirectPath("/results");
    } else {
      setRedirectPath("/welcome");
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-white">
      <section className="w-full max-w-xl text-center bg-white/5 backdrop-blur-md p-10 rounded-2xl shadow-lg border border-white/10">
        <p className="text-sm uppercase tracking-wide text-white/70 mb-2">
          Error
        </p>

        <h1 className="text-7xl font-bold mb-4">404</h1>

        <h2 className="text-2xl font-semibold mb-3">
          This page didn’t mint properly.
        </h2>

        <p className="text-white/80 mb-6">
          Either the route is broken or this page flunked the quiz and got
          burned. Don’t worry, you can try again or return home.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate(redirectPath)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg sm:text-xl w-full max-w-[200px] flex items-center justify-center"
          >
            Try Again
          </button>
        </div>

        <p className="mt-6 text-xs text-white/50">
          Lost in the gradient between question and chain.
        </p>
      </section>
    </main>
  );
}
