"use client";

import { useNilAccountBalance } from "@nillion/client-react-hooks";
import type { FC } from "react";

export const AccountBalance: FC = () => {
  const mutation = useNilAccountBalance();

  let data = "";
  if (mutation.isSuccess) {
    // stringify cannot handle BigInts
    data = JSON.stringify(mutation.data, (_, v) =>
      typeof v === "bigint" ? v.toString() : v,
    );
  } else if (mutation.isError) {
    data = mutation.error.message;
  }
  return (
    <div className="border border-gray-400 rounded-lg p-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2">Account Balance</h2>
      <ul className="mt-4">
        <li className="mt-2">Status: {mutation.status}</li>
        <li className="mt-2">Result: {data}</li>
      </ul>
      <button
        className={`flex items-center justify-center w-40 px-4 py-2 mt-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 ${
          mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={(): void => mutation.execute()}
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
