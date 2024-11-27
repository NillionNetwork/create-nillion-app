"use client";

import {
  useNilRetrieveComputeResults,
} from "@nillion/client-react-hooks";
import { Uuid } from "@nillion/client-vms";
import { type ChangeEvent, type FC, useState } from "react";

export const RetrieveComputeResults: FC = () => {
  const mutation = useNilRetrieveComputeResults();
  const [id, setId] = useState("");
  const isValidUuid = Uuid.safeParse(id).success;

  let data = "";
  if (mutation.isSuccess) {
    // stringify cannot handle BigInts
    data = data = JSON.stringify(mutation.data, (_, v) =>
      typeof v === "bigint" ? v.toString() : v,
    );
  } else if (mutation.isError) {
    data = mutation.error.message;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setId(event.target.value);
  }

  function handleClick(): void {
    const options = { id };
    mutation.execute(options);
  }

  return (
    <div className="border border-gray-400 rounded-lg p-4 w-full max-w-md overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Retrieve Compute Results</h2>
      <div className="mb-2">
        Result Id:{" "}
        <input
          className="w-full p-2 border border-gray-300 rounded text-black"
          value={id}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2 mb-4">
        <div className="break-words">1. Status: {mutation.status}</div>
        <div className="break-words whitespace-normal">2. Results: {data}</div>
      </div>
      <button
        className={`flex items-center justify-center px-4 py-2 border rounded text-black ${
          !isValidUuid ? "opacity-50 cursor-not-allowed bg-gray-200" : "bg-white hover:bg-gray-100"
        }`}
        onClick={handleClick}
        disabled={!isValidUuid}
      >
        Execute
      </button>
    </div>
  );
};
