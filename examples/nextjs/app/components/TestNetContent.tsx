export const TestNetContent = () => {
  return (
    <div className="min-w-4xl">
      <ol className="list-inside list-decimal text-sm text-center sm:text-left mt-4">
        <li className="mb-2">
          Ensure you are no longer running{" "}
          <code className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md p-1 mx-1">
            nillion-devnet
          </code>
        </li>
        <li className="mb-2">
          Update the network setting in
          <code className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md p-1 mx-1">
            LoginButton.tsx
          </code>
          to
          <code className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md p-1 mx-1">
            testnet
          </code>
        </li>
        <li className="mb-2">
          Adjust the client
          <code className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md p-1 mx-1">
            config
          </code>
          to be the testnet code
        </li>
        <li className="mb-2">Ensure you have a Keplr Wallet</li>
        <li className="mb-2">Add the Nillion Testnet chain using the &quot;n&quot; button</li>
        <li className="mb-2">Connect to Keplr Wallet</li>
      </ol>
    </div>
  );
};
