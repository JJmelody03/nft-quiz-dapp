import { useLocation } from "react-router-dom";
import WalletBadge from "./WalletBadge";

function WalletBadgeWrapper() {
  const allowedRoutes = ["/welcome", "/results"]; // Add more paths as needed
  const location = useLocation();
  const showBadge = allowedRoutes.includes(location.pathname);

  return showBadge ? <WalletBadge /> : null;
}

export default WalletBadgeWrapper;
