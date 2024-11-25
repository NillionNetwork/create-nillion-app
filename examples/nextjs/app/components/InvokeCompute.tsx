"use client";

import {
  useNilInvokeCompute,
  useNillion,
} from "@nillion/client-react-hooks";
import { NadaValue, ProgramId } from "@nillion/client-vms";
import { type ChangeEvent, type FC, useState } from "react";

export const InvokeCompute: FC = () => {
  const { client } = useNillion();
  const mutation = useNilInvokeCompute();
  const [programId, setProgramId] = useState("");
  const isValidProgramId = ProgramId.safeParse(programId).success;

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setProgramId(event.target.value);
  }

  function handleClick(): void {
    // Assumes secret_addition.py
    const options = {
      programId,
      inputBindings: [{ party: "Party1", user: client.id }],
      outputBindings: [{ party: "Party1", users: [client.id] }],
      valueIds: [],
      computeTimeValues: [
        {
          name: "my_int1",
          value: NadaValue.new_secret_integer("2"),
        },
        {
          name: "my_int2",
          value: NadaValue.new_secret_integer("4"),
        },
      ],
    };
    mutation.execute(options);
  }

  let resultId = "";
  if (mutation.isSuccess) {
    resultId = mutation.data;
  } else if (mutation.isError) {
    resultId = mutation.error.message;
  }

  return (
    <div className="border border-gray-400 rounded-lg p-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Invoke Compute</h2>
      <p className="my-2 italic text-sm mt-2">
        Current values are 4 & 2. Refer to InvokeCompute.tsx
      </p>
      <div className="mt-2">
        Program id:{" "}
        <input
          className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
          type="text"
          value={programId}
          onChange={handleChange}
        />
      </div>
      <ol className="list-disc pl-5">
        <li className="mt-2">Status: {mutation.status}</li>
        <li className="my-2">
          Compute result id:
          {mutation.isSuccess ? (
            <>
              {`${resultId.substring(0, 4)}...${resultId.substring(resultId.length - 4)}`}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(resultId);
                }}
              >
                📋
              </button>
            </>
          ) : (
            ""
          )}
        </li>
      </ol>
      <button
        className={`flex items-center justify-center px-4 py-2 border rounded text-black mb-4 ${
          !isValidProgramId
            ? "opacity-50 cursor-not-allowed bg-gray-200"
            : "bg-white hover:bg-gray-100"
        }`}
        type="button"
        disabled={!isValidProgramId}
        onClick={handleClick}
      >
        Execute
      </button>
    </div>
  );
};
