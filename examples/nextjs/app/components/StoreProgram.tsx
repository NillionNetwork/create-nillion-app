"use client";

import { useNilStoreProgram } from "@nillion/client-react-hooks";
import { type FC, useState } from "react";

export const StoreProgram: FC = () => {
  const mutation = useNilStoreProgram();
  const [name, setName] = useState("");
  const [program, setProgram] = useState<Uint8Array | null>(null);
  const programDefined = name && program;
  const [copiedProgramID, setProgramIDCopied] = useState(false);

  let id = "";
  if (mutation.isSuccess) {
    id = mutation.data;
  } else if (mutation.isError) {
    id = mutation.error.message;
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (file) {
      setName(file.name.replace('.nada.bin', ''));
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (content) {
          setProgram(new Uint8Array(content as ArrayBuffer));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  function handleClick(): void {
    if (!program) throw new Error("Expected `program` to be undefined");
    mutation.execute({ name, program });
  }

  return (
    <div className="border border-gray-400 rounded-lg p-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Store Program</h2>
      <label className="relative">
        <span className="bg-white text-black px-4 py-2 rounded cursor-pointer">Choose file</span>
        <input type="file" className="hidden" onChange={handleFileChange} accept=".bin" />
      </label>
      <ul className="list-disc pl-5 mt-4">
        <li className="mt-2">Status: {mutation.status}</li>
        <li className="mt-2">Name: {name}</li>
        <li className="mt-2">
          Program Id:
          {mutation.isSuccess ? (
            <>
              {`${id.substring(0, 4)}...${id.substring(id.length - 4)}`}
              <button
                onClick={() => {
                  setProgramIDCopied(true);
                  navigator.clipboard.writeText(id);
                  setTimeout(() => setProgramIDCopied(false), 2000);
                }}
              >
                {!copiedProgramID ? " 📋" : " ✅"}
              </button>
            </>
          ) : (
            ""
          )}
        </li>
      </ul>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 border rounded text-black mt-2 ${
            !programDefined
              ? "opacity-50 bg-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
          onClick={handleClick}
          disabled={!programDefined}
        >
          Store
        </button>
      </div>
    </div>
  );
};
