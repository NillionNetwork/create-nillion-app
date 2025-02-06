"use client";

import { useNilStoreValues } from "@nillion/client-react-hooks";
import { NadaValue } from "@nillion/client-vms";
import { useState, type FC } from "react";

export const StoreValue: FC = () => {
  const mutation = useNilStoreValues();
  const [copied, setCopied] = useState(false);

  let id = "";
  if (mutation.isSuccess) {
    id = mutation.data;
  } else if (mutation.isError) {
    id = mutation.error.message;
  }

  const options = {
    values: [
      { name: "data", value: NadaValue.new_secret_integer("42") },
      { name: "coolValue", value: NadaValue.new_secret_boolean(true) },
    ],
    ttl: 1,
  };

  function handleClick(): void {
    mutation.execute(options);
  }
  return (
    <div className="border border-gray-400 rounded-lg p-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2">Store Value</h2>
      <ul className="mt-4">
        <li className="mt-2">Status: {mutation.status}</li>
        <li className="mt-2">
          Store Id:
          {mutation.isSuccess ? (
            <>
              {`${id.substring(0, 6)}...${id.substring(id.length - 6)}`}
              <button
                onClick={() => {
                  setCopied(true);
                  navigator.clipboard.writeText(id);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                {!copied ? " 📋" : " ✅"}
              </button>
            </>
          ) : (
            "idle"
          )}
        </li>
      </ul>
      <button
        className={`flex items-center justify-center w-40 px-4 py-2 mt-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 ${
          mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleClick}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? (
          <div className="w-5 h-5 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        ) : (
          <>Execute</>
        )}
      </button>
    </div>
  );
};
