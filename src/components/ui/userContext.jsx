import { useContext, createContext, useState, useEffect } from "react";
import { useWallet } from "./WalletConnect";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "",
    investorId: "",
    walletAddress: null,
  });

  // ✅ Restore user from localStorage on app load
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUser((prev) => ({
        ...prev,
        name: JSON.parse(savedName),
      }));
    }
  }, []);

  // Restore wallet address from local storage
  useEffect(() => {
    const savedWalletAddress = localStorage.getItem("walletAddress");
    if (savedWalletAddress) {
      setUser((prev) => ({
        ...prev,

        walletAddress: JSON.parse(savedWalletAddress),
      }));
    }
  }, [user.walletAddress]);

  // ✅ Save user.name to localStorage whenever it changes
  useEffect(() => {
    if (user?.name) {
      localStorage.setItem("userName", JSON.stringify(user.name));
      console.log(user);
    }
  }, [user.name]);

  // Save wallet address to local storage whenever it changes
  useEffect(() => {
    if (user?.walletAddress) {
      localStorage.setItem("walletAddress", JSON.stringify(user.walletAddress));
    }
  }, [user.walletAddress]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
