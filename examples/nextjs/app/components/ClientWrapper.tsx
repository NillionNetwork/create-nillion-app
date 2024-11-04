"use client";

import { ReactNode } from "react";

import { NillionProvider } from "@nillion/client-react-hooks";

// To switch from devnet to testnet(photon), change the network in the NillionProvider
export const ClientWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <NillionProvider network="photon">{children}</NillionProvider>;
};
