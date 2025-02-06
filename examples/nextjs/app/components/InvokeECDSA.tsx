"use client";

import { useNilInvokeCompute, useNillion } from "@nillion/client-react-hooks";
import { Uuid } from "@nillion/client-vms";
import { type ChangeEvent, type FC, useState } from "react";

export const InvokeECDSA: FC = () => {
  const { client } = useNillion();
  const mutation = useNilInvokeCompute();
  const [id, setId] = useState("");
  const isValidUuid = Uuid.safeParse(id).success;

  const tecdsaProgramId = "builtin/tecdsa_sign";

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setId(event.target.value);
  }

  function handleClick(): void {
    // Assumes addition_division.py
    const options = {
      programId: tecdsaProgramId,
      inputBindings: [
        { party: "tecdsa_key_party", user: client.id },
        { party: "tecdsa_digest_message_party", user: client.id },
      ],
      outputBindings: [{ party: "tecdsa_output_party", users: [client.id] }],
      valueIds: [id],
      computeTimeValues: [],
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
      <h2 className="text-2xl font-bold mb-2">Invoke Compute</h2>
      <ul className="mt-4">
        <li className="mt-2">Status: {mutation.status}</li>
        <li className="mt-2"> Program id: {tecdsaProgramId}</li>
        <li className="mt-2">
          Id:{" "}
          <input
            type="text"
            value={id}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </li>
        <li className="mt-2">Compute result id: {resultId}</li>
      </ul>
      <button
        type="button"
        disabled={!isValidUuid}
        onClick={handleClick}
        className={`flex items-center justify-center w-40 px-4 py-2 mt-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 ${!isValidUuid ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Execute
      </button>
    </div>
  );
};
