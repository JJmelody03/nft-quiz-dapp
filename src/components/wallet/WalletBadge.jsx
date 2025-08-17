import { useUser } from "../ui/userContext";

function WalletBadge() {
  const { user } = useUser();
  console.log("Wallet Address:", user.walletAddress);

  if (!user?.walletAddress) return null;

  const truncateId = (id) =>
    id.length > 10 ? `${id.slice(0, 4)}...${id.slice(-5)}` : id;

  return (
    <div className="fixed top-4 right-4 border px-4 py-2 rounded-md shadow-md text-sm font-medium text-white border-[#ECABAB] w-[120px] bg-transparent backdrop-blur-sm">
      {truncateId(user.walletAddress)}
    </div>
  );
}

export default WalletBadge;
