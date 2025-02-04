"use client";

import { useState } from "react";
import Image from "next/image";
import { NillionProvider } from "@nillion/client-react-hooks";
import { StoreValuesConfig, type VmClient } from "@nillion/client-vms";
import { LoginButton } from "./components/LoginButton";
import { InstructionsTab } from "./components/InstructionsTab";
import { StoreValue } from "./components/StoreValue";
import { RetrieveValues } from "./components/RetrieveValues";
import { DeleteValues } from "./components/DeleteValues";
import { UpdateValues } from "./components/UpdateValues";
import { StoreProgram } from "./components/StoreProgram";
import { InvokeCompute } from "./components/InvokeCompute";
import { RetrieveComputeResults } from "./components/RetrieveComputeResults";
import { AccountBalance } from "./components/AccountBalance";
import { FundAccount } from "./components/FundAccount";
import { StoreSignatureValues } from "./components/StoreSignatureValues";
import { UpdateEcdsaPermissions } from "./components/UpdateECDSAPermissions";
import { InvokeECDSA } from "./components/InvokeECDSA";

export default function Home() {
  const [client, setClient] = useState<VmClient | undefined>();

  const handleClientCreated = (newClient: VmClient | undefined) => {
    setClient(newClient);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full flex flex-col items-center font-mono text-sm">
        <Image
          src="/logo.svg"
          alt="Next.js logo"
          style={{ width: "180px", height: "38px" }}
          width={180}
          height={38}
          priority
          className="hidden dark:block"
        />
        <Image
          src="/dark_logo.svg"
          alt="Next.js logo"
          style={{ width: "180px", height: "38px" }}
          width={180}
          height={38}
          priority
          className="block dark:hidden"
        />
        <InstructionsTab />
        <LoginButton
          onClientCreated={handleClientCreated}
          isConnected={!!client}
        />
        {client && (
          <NillionProvider client={client}>
            <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
                <AccountBalance />
                <FundAccount />
                <StoreValue />
                <RetrieveValues />
                <UpdateValues />
                <DeleteValues />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                <StoreProgram />
                <InvokeCompute />
                <RetrieveComputeResults />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                <StoreSignatureValues />
                <UpdateEcdsaPermissions />
                <InvokeECDSA />
              </div>
            </div>
          </NillionProvider>
        )}
      </div>
    </main>
  );
}
