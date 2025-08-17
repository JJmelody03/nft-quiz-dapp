import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log("Auth status from localStorage:", isAuthenticated);

    if (isAuthenticated === "true") {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
      navigate("/", { replace: true }); // Redirect to auth page
    }
  }, [navigate]);

  if (isAllowed === null) return null; // while checking
  if (!isAllowed) return null; // or a spinner or redirect message

  return children;
}
