import { FC, useState } from "react";
import { createClient, getKeplr } from "@nillion/client-react-hooks";
import type { VmClient } from "@nillion/client-vms";
import { AddTestnetChain } from "./AddTestnetChain";

interface LoginButtonProps {
  onClientCreated: (client: VmClient) => void;
  isConnected: boolean;
}

type NetworkType = "devnet" | "testnet";

export const LoginButton: FC<LoginButtonProps> = ({
  onClientCreated,
  isConnected,
}) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const NETWORK: NetworkType = "devnet"; // devnet or testnet  <-- Change here.
  const isTestnet = (network: NetworkType): network is "testnet" =>
    network === "testnet";

  const chainId = "nillion-chain-testnet-1";

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // For DEVNET
      // const client = await createClient({
      //   network: NETWORK,
      // });

      // // Uncomment the following line to use TESTNET + Keplr wallet
      const client = await createClient({
        network: "testnet",
        seed: "foobarbaz",
        keplr: await getKeplr(),
      });

      onClientCreated(client);

      if (isTestnet(NETWORK)) {
        const keplr = window.keplr;
        if (!keplr) {
          throw new Error("Keplr not found");
        }
        const offlineSigner = keplr.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();

        if (!accounts || accounts.length === 0) {
          throw new Error("No accounts found");
        }

        const address = accounts[0].address;
        setWalletAddress(address);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Failed to initialize client:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    //@ts-expect-error empty client
    onClientCreated(null);
  };

  return (
    <div className="flex flex-row items-center gap-2">
      {isTestnet(NETWORK) && <AddTestnetChain />}
      <button
        onClick={isConnected ? handleDisconnect : handleLogin}
        disabled={isLoading}
        className={`px-4 py-3 font-semibold text-sm rounded-lg shadow-sm hover:bg-blue-600 transition-colors ${isConnected ? "bg-blue-500 text-white" : "bg-blue-500 text-white"}`}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Connecting...
          </span>
        ) : isConnected ? (
          walletAddress && isTestnet(NETWORK) ? (
            `${walletAddress?.substring(0, 11)}...${walletAddress?.substring(walletAddress.length - 3)}`
          ) : (
            "Logout"
          )
        ) : (
          "Login"
        )}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
