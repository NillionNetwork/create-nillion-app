import { config } from "../config/Chain";
import Image from "next/image";

const checkKeplr = async () => {
  try {
    const keplr = window.keplr;
    if (!keplr) {
      throw new Error("Please install Keplr extension");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
};

const addDevnetChain = async () => {
  try {
    await checkKeplr();

    const chainId = "nillion-chain-testnet-1";
    const keplr = window.keplr;
    if (!keplr) {
      throw new Error("Keplr not found");
    }

    try {
      await keplr.getKey(chainId);
      console.log("Chain already exists in Keplr!");
    } catch {
      console.log("Adding new chain to Keplr...");
      await keplr.experimentalSuggestChain(config);
    }
    await keplr.enable(chainId);
  } catch (error: unknown) {
    console.error("Error:", error);
    if (
      error instanceof Error &&
      error.message.includes("chain not supported")
    ) {
      console.log(
        "This chain needs to be manually added with chainInfo configuration",
      );
    }
    throw error;
  }
};

export const AddTestnetChain: React.FC = () => {
  return (
    <button
      onClick={addDevnetChain}
      className="px-4 py-2 border dark:bg-gray-100 border-gray-300 rounded text-white rounded hover:bg-gray-200 transition-colors mr-2 flex items-center"
    >
      <Image src="/nillion_n.png" alt="Nillion Icon" width={24} height={24} />
    </button>
  );
};
