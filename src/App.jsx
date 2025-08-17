import QuizAuthentication from "./pages/QuizAuthentication";
import Spinner from "./pages/Spinner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomPage from "./pages/WelcomPage";
import WalletBadgeWrapper from "./components/wallet/WalletBadgeWrapper";
import { UserProvider } from "./components/ui/userContext";
import Logo from "./assets/images/logo.webp";
import { QuestionsProvider } from "./components/ui/questionsContext";
import QuizContainer from "./pages/QuizContainer";
import Timer from "./pages/Timer";
import ResultScreen from "./pages/ResultScreen";
import RequireAuth from "./components/ui/RequireAuth";
import NotFound404 from "./pages/NotFound404";
import { Walletprovider } from "./components/ui/WalletConnect";
import WalletStatusMessage from "./pages/WalletStatusMessage";
export default function App() {
  return (
    <>
      <UserProvider>
        <QuestionsProvider>
          <BrowserRouter>
            <WalletBadgeWrapper />
            <Walletprovider>
              <WalletStatusMessage />
              <Routes>
                <Route path="/" element={<Spinner />} />

                <Route path="validation" element={<QuizAuthentication />} />

                <Route
                  path="welcome"
                  element={
                    <RequireAuth>
                      <WelcomPage />
                    </RequireAuth>
                  }
                />

                <Route
                  path="quiz"
                  element={
                    <RequireAuth>
                      <QuizContainer />
                    </RequireAuth>
                  }
                />
                <Route
                  path="results"
                  element={
                    <RequireAuth>
                      <ResultScreen />
                    </RequireAuth>
                  }
                />
                <Route path="*" element={<NotFound404 />} />
              </Routes>
            </Walletprovider>
          </BrowserRouter>
        </QuestionsProvider>
      </UserProvider>
    </>
  );
}
