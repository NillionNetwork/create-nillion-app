export const TestNetContent = () => {
  return (
    <div className="min-w-4xl">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left mt-4">
          <li className="mb-2">
            Ensure you are no longer running <code className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md p-1 mx-1">nillion-devnet</code>
          </li>
          <li className="mb-2">
          Update the network setting in your &quot;createClient&quot;
          network settings in 
            <code className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md p-1 mx-1">
              pages.tsx
            </code>
            to &quot;testnet&quot;
          </li>
          <li className="mb-2">
            Ensure you have a Keplr Wallet
          </li>
          <li className="mb-2">
            Add the Nillion Testnet chain
          </li>
          <li className="mb-2">
            Connect to Keplr Wallet
          </li>
        </ol>
    </div>
  );
};
