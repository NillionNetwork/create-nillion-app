"use client";

import { useNilStoreValues } from "@nillion/client-react-hooks";
import { NadaValue, Uuid } from "@nillion/client-vms";
import { type ChangeEvent, type FC, useState } from "react";

export const UpdateValues: FC = () => {
  const mutation = useNilStoreValues();
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

  const options = {
    values: [{ name: "bob", value: NadaValue.new_secret_integer("77") }],
    ttl: 1,
    id,
  };
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setId(event.target.value.trim());
  }

  function handleClick(): void {
    mutation.execute(options);
  }

  return (
    <div className="border border-gray-400 rounded-lg p-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2">Update Values</h2>
      <ul className="mt-4">
        <li className="mt-2">Status: {mutation.status}</li>
        <li className="mt-2">
          <input
            type="text"
            value={id}
            onChange={handleChange}
            placeholder="Store Id"
            className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
          />
        </li>
        <li className="mt-2">Data: {data}</li>
      </ul>
      <button
        className={`flex items-center justify-center w-40 px-4 py-2 mt-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 ${
          !isValidUuid ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleClick}
        disabled={!isValidUuid}
      >
        Execute
      </button>
    </div>
  );
};
