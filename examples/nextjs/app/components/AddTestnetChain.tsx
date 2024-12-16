import { useEffect, useState } from "react";
import { config } from "../config/Chain";
import Image from "next/image";
import { getKeplr } from "@nillion/client-react-hooks";


const addDevnetChain = async () => {
  try {
    const keplr = await getKeplr();
    if (!keplr) {
      throw new Error("Keplr not found");
    }

    const chainId = "nillion-chain-testnet-1";
    try {

      await keplr.getKey(chainId);
      console.log("Chain already exists in Keplr!");
    } catch {
      console.log("Adding new chain to Keplr...");
      await keplr.experimentalSuggestChain(config);
    }

    await keplr.enable(chainId);
    console.log("Chain successfully added and enabled in Keplr!");

  } catch (error: unknown) {
    console.error("Error adding chain:", error);
    
    if (error instanceof Error && error.message.includes("chain not supported")) {
      console.log("This chain needs to be manually added with chainInfo configuration");
    }
    
    throw error;
  }
};

export const AddTestnetChain: React.FC = () => {
  const [keplrAvailable, setKeplrAvailable] = useState(false);

  useEffect(() => {
    const initializeKeplr = async () => {
      try {
        const keplr = await getKeplr();
        if (keplr) {
          setKeplrAvailable(true);
        }
      } catch (error) {
        console.error("Keplr is not available:", error);
      }
    };

    initializeKeplr();
  }, []);

  return (
    <>
      {keplrAvailable ? (
        <button
          onClick={addDevnetChain}
          className="px-4 py-2 border dark:bg-gray-100 border-gray-300 rounded text-white rounded hover:bg-gray-200 transition-colors mr-2 flex items-center"
        >
          <Image src="/nillion_n.png" alt="Nillion Icon" width={24} height={24} />
        </button>
      ) : (
        <a
          href="https://www.keplr.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <Image src="/nillion_n.png" alt="Install Keplr" width={24} height={24} />
          <p className="ml-2 text-blue-500 underline">Click here to install Keplr</p>
        </a>
      )}
    </>
  );
};
