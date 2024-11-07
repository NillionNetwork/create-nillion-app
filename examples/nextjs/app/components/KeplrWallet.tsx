"use client";

import { useState } from "react";
import { useNillionAuth, UserCredentials } from "@nillion/client-react-hooks";
import { config } from "../config/Chain";
import Image from "next/image";
import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
  interface Window extends KeplrWindow {}
}

const SEED = "example-secret-seed";

const KeplrWalletConnector = () => {
  const { authenticated, login, logout } = useNillionAuth();
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkKeplr = async () => {
    try {
      const keplr = window.keplr;
      if (!keplr) {
        throw new Error("Please install Keplr extension");
      }
    } catch (err:unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
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
    } catch (error:unknown) {
      console.error("Error:", error);
      if (error instanceof Error && error.message.includes("chain not supported")) {
        console.log("This chain needs to be manually added with chainInfo configuration");
      }
      throw error;
    }
  };
  
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await checkKeplr();
      
      const chainId = "nillion-chain-testnet-1";
      await addDevnetChain();
      
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
      const credentials: UserCredentials = {
        userSeed: SEED,
      };
      await login(credentials);
      console.log("Successfully logged in with address:", address);
    } catch (err: unknown) {
      console.error("Login error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setWalletAddress("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      setWalletAddress("");
      setError("");
    } catch (err: unknown) {
      console.error("Logout error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <div className="flex flex-row">
        <button
          onClick={addDevnetChain}
          className="px-4 py-2 border dark:bg-gray-100 border-gray-300 rounded text-white rounded hover:bg-gray-200 transition-colors mr-2 flex items-center"
        >
          <Image
            src="/nillion_n.png"
            alt="Nillion Icon"
            width={24}
            height={24}
          />
        </button>

        {isLoading ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            disabled
          >
            Connecting...
          </button>
        ) : authenticated ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {walletAddress?.substring(0, 11) + "..." + walletAddress?.substring(walletAddress.length - 3)}
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Connect Keplr Wallet
          </button>
        )}
      </div>

    </div>
  );
};
export default KeplrWalletConnector;