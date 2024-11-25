"use client";

import { useNilDeleteValues } from "@nillion/client-react-hooks";
import { Uuid } from "@nillion/client-vms";
import { type ChangeEvent, type FC, useState } from "react";

export const DeleteValues: FC = () => {
  const mutation = useNilDeleteValues();
  const [id, setId] = useState("");
  const isValidUuid = Uuid.safeParse(id).success;

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setId(event.target.value.trim());
  }

  function handleClick(): void {
    const options = { id };
    mutation.execute(options);
  }

  return (
    <div className="border border-gray-400 rounded-lg p-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2">Delete Values</h2>
      <ul className="mt-4">
        <li className="mt-2">Status: {mutation.status}</li>
        <li className="mt-2">
          <input
            type="text"
            value={id}
            onChange={handleChange}
            placeholder="Store ID"
            className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
          />
        </li>
      </ul>
      <button
        className={`flex items-center justify-center w-40 px-4 py-2 md:mt-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 ${
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
