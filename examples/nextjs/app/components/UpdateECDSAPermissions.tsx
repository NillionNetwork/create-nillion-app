"use client";

import {
  useNilUpdatePermissions,
  useNillion,
} from "@nillion/client-react-hooks";
import { UpdatePermissionsBuilder, Uuid } from "@nillion/client-vms";
import { type ChangeEvent, type FC, useMemo, useState } from "react";

export const UpdateEcdsaPermissions: FC = () => {
  const { client } = useNillion();
  const mutation = useNilUpdatePermissions();
  const [id, setId] = useState("");
  const isValidUuid = Uuid.safeParse(id).success;

  const tecdsaProgramId = "builtin/tecdsa_sign";

  const permissions = useMemo(() => {
    return UpdatePermissionsBuilder.init(client).grantCompute(
      client.id,
      tecdsaProgramId,
    );
  }, [client.id]);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setId(event.target.value);
  }

  function handleClick(): void {
    const options = { id, permissions };
    mutation.execute(options);
  }

  return (
    <div className="border border-gray-400 rounded-lg p-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2">Update ECDSA Sign Permissions</h2>
      <ul className="mt-4">
        <li className="mt-2">Status: {mutation.status}</li>
        <li className="mt-2">
          New permissions: {JSON.stringify(permissions.toObject())}
        </li>
        <li className="mt-2">
          Id:{" "}
          <input
            type="text"
            value={id}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </li>
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
