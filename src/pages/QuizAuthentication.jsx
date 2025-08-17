import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { useUser } from "../components/ui/userContext";
import CenteredLayout from "../components/ui/CenteredLayout";
import Logo from "../assets/images/logo.webp";
import { useWallet } from "../components/ui/WalletConnect";
function QuizAuthentication() {
  const [name, setName] = useState("");
  const [investorId, setInvestorId] = useState("");
  const [canRetry, setCanRetry] = useState(true);
  const [buttonStatus, setButtonStatus] = useState({
    text: "Connect Wallet",
    isConnecting: false,
    isComplete: false,
    result: "",
  });

  const navigate = useNavigate();
  const { address, connectWallet } = useWallet();
  const { setUser } = useUser();

  const handleClick = async () => {
    if (!name.trim()) {
      alert("Please enter your name before connecting.");
      return false;
    }

    setButtonStatus({
      text: "Connecting",
      isConnecting: true,
      isComplete: false,
      isError: false,
      result: "",
    });

    try {
      await new Promise((res) => setTimeout(res, 2000));
      const walletResponse = await connectWallet();
      if (!walletResponse) throw new Error("No wallet returned");
      localStorage.setItem("walletAddress", JSON.stringify(walletResponse)); // save it

      setUser({
        name,
        investorId,
        walletAddress: walletResponse,
      });

      setButtonStatus({
        text: "Connected",
        isConnecting: false,
        isComplete: true,
        isError: false,
        result: "Connected successfully",
      });
      return true;
    } catch {
      setButtonStatus({
        text: "Failed to Connect",
        isConnecting: false,
        isComplete: true,
        isError: true,
        result: "Connection failed",
      });

      setCanRetry(false);
      setTimeout(() => {
        setCanRetry(true),
          setButtonStatus({
            text: "Try Again",
            isConnecting: false,
            isComplete: false,
            isError: false,
            result: "",
          });
      }, 2500);
      return false;
    }
  };

  function handleNavigation() {
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/welcome", { replace: true });
    }, 3500); // Adjusting to navigate after a delay if necessary
  }
  useEffect(() => {
    const savedWalletAddress = localStorage.getItem("walletAddress");
    if (savedWalletAddress) {
      setUser((prev) => ({
        ...prev,
        walletAddress: JSON.parse(savedWalletAddress),
      }));
    }
  }, []); // ✅ only runs once on mount

  const buttonClasses = {
    connecting: "bg-[#CD3E70]",
    error: "bg-red-500 hover:bg-red-600",
    connected: "bg-green-500 hover:bg-green-600",
  };

  const getButtonClass = (buttonStatus) => {
    if (buttonStatus.isConnecting) {
      return buttonClasses.connecting;
    } else if (buttonStatus.isError) {
      return buttonClasses.error;
    } else if (buttonStatus.isComplete) {
      return buttonClasses.connected;
    }
  };

  // Using useEffect to trigger navigation after buttonStatus is complete
  useEffect(() => {
    if (buttonStatus.isComplete && !buttonStatus.isError) {
      handleNavigation(); // Only navigate once the button is complete (after "Connected")
    }
  }, [buttonStatus.isComplete, buttonStatus.isError]);

  return (
    <>
      {/* Text (Centered) */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 gap-6">
        <img
          src={Logo}
          alt="Logo"
          loading="eager"
          className="absolute top-4 left-4 w-24 h-auto sm:w-32 md:w-40 lg:w-32" // Responsive logo size
        />
        {/* Background card */}
        <div className="relative bg-[#D9D9D9]/10 rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md text-center shadow-2xl overflow-hidden flex flex-col items-center justify-center">
          {/* Heading */}
          <p className="font-semibold text-center mb-6 text-lg sm:text-xl">
            Welcome to the Chaindustry Certification Quiz
          </p>
          {/* Name Input */}
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-[300px] h-[48px] rounded-xl bg-[rgba(200,194,194,0.2)] text-center placeholder:text-center mb-4 sm:mb-6"
          />
          {/* Investor ID Input */}
          <input
            type="text"
            value={investorId}
            placeholder="Enter Your Investor ID (optional)"
            onChange={(e) => setInvestorId(e.target.value)}
            className="w-full max-w-[300px] h-[48px] rounded-xl bg-[rgba(200,194,194,0.2)] text-center placeholder:text-center mb-4 sm:mb-6"
          />
          {/* Button Container with Flex to Center Button */}
          <div className="flex justify-center w-full mb-4">
            {" "}
            {/* Ensures that the button container is full width and centered */}
            <button
              onClick={async () => {
                const success = await handleClick();

                if (!success) {
                  return;
                } else {
                  // Don't call handleNavigation here, it's handled by useEffect
                }
              }}
              disabled={
                !canRetry ||
                buttonStatus.isConnecting ||
                buttonStatus.isComplete
              }
              className={` 
              ${getButtonClass(buttonStatus)} 
              bg-[#CD3E78] 
              rounded-xl 
              w-full max-w-[200px] 
              h-[45px] 
              text-white 
              text-base 
              font-semibold
              transition-colors 
              duration-300 
              hover:shadow-lg
              hover:shadow-[#9D174D]/30
              flex
              items-center
              justify-center
            `}
            >
              {buttonStatus.text}
              {buttonStatus.isConnecting && (
                <span className="ml-2 font-semibold">
                  <RingLoader size={15} margin={6} speedMultiplier={0.8} />
                </span>
              )}
            </button>
          </div>{" "}
          {/* End of button container */}
        </div>
      </div>
    </>
  );
}

export default QuizAuthentication;
