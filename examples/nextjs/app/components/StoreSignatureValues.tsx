"use client";

import { useNilStoreValues } from "@nillion/client-react-hooks";
import { NadaValue } from "@nillion/client-vms";
import { secp256k1 } from "@noble/curves/secp256k1";
import { sha256 } from "@noble/hashes/sha2";
import { bytesToHex } from "@noble/hashes/utils";
import { useMemo } from "react";

export const StoreSignatureValues = () => {
  const storeValuesMutation = useNilStoreValues();

  const { options, stringifiedOptions } = useMemo(() => {
    const privateKey = secp256k1.utils.randomPrivateKey();
    const digestMessage = sha256("A deep message with a deep number: 42");

    const opts = {
      values: [
        {
          name: "tecdsa_private_key",
          value: NadaValue.new_ecdsa_private_key(privateKey),
        },
        {
          name: "tecdsa_digest_message",
          value: NadaValue.new_ecdsa_digest_message(digestMessage),
        },
      ],
      ttl: 1,
    };

    return {
      options: opts,
      stringifiedOptions: JSON.stringify({
        ...opts,
        values: opts.values.map(({ name, value }) => ({
          name,
          value: {
            type: value.type_name(),
            value: bytesToHex(value.to_byte_array()),
          },
        })),
      }),
    };
  }, []);

  const id = storeValuesMutation.isSuccess
    ? storeValuesMutation.data
    : storeValuesMutation.isError
      ? storeValuesMutation.error.message
      : "";

  return (
    <div className="border border-gray-400 rounded-lg p-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2">Store Signature Values</h2>
      <div className="mt-4 space-y-2">
        <p>Status: {storeValuesMutation.status}</p>
        <p className="break-all">Options: {stringifiedOptions}</p>
        <p>Store Id: {id}</p>
      </div>
      <button
        className={`mt-4 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={() => storeValuesMutation.execute(options)}
        disabled={storeValuesMutation.isLoading}
      >
        {storeValuesMutation.isLoading ? (
          <div className="w-5 h-5 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin" />
        ) : (
          "Execute"
        )}
      </button>
    </div>
  );
};
