import React from "react";

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-5 h-5 border-t-2 border-b-2 border-gray-900 dark:border-white rounded-full animate-spin"></div>
    </div>
  );
};
