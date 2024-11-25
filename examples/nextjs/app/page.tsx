"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { NillionProvider, createClient } from "@nillion/client-react-hooks";
import type { VmClient } from "@nillion/client-vms";

import { LoadingSpinner } from "./components/LoadingSpinner";
import InstructionsTab from "./components/InstructionsTab";
import { StoreValue } from "./components/StoreValue";
import { RetrieveValues } from "./components/RetrieveValues";
import { DeleteValues } from "./components/DeleteValues";
import { UpdateValues } from "./components/UpdateValues";
import { StoreProgram } from "./components/StoreProgram";
import { InvokeCompute } from "./components/InvokeCompute";
import { RetrieveComputeResults } from "./components/RetrieveComputeResults";

export default function Home() {
  const [client, setClient] = useState<VmClient>();

  useEffect(() => {
    const init = async () => {
      const client = await createClient({ network: "devnet" });
      setClient(client);
    };
    void init();
  }, []);

  if (!client) {
    return <LoadingSpinner />;
  }

  console.log("client", client);

  return (
    <NillionProvider client={client}>
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
          <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
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
          </div>
        </div>
      </main>
    </NillionProvider>
  );
}
