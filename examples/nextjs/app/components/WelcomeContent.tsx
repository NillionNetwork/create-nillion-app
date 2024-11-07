export const WelcomeContent = () => {
  return (
    <div className="max-w-4xl">
      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mt-4">
        <li className="mb-2">
          Follow along the quickstart guide {" "}
          <a
            href="https://github.com/NillionNetwork/awesome-nillion/issues/2"
            target="_blank"
            className="underline"
            rel="noopener noreferrer"
          >
            here
          </a>
        </li>
        <li className="mb-2">
          Make sure you are running
          <code className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md p-1 mx-1">
            nillion-devnet
          </code>
          in a separate terminal.
        </li>
        <li className="mb-2">
          Reach out to us on {" "}
          <a
            href="https://github.com/orgs/NillionNetwork/discussions"
            target="_blank"
            className="underline"
            rel="noopener noreferrer"
          >
            Github Discussions
          </a>
          {""} if you get stuck
        </li>
      </ol>
    </div>
  );
};
