"use client";

import { useState } from 'react';
import KeplrWalletConnector from './KeplrWallet';
import { Login } from './Login';
import { TestNetContent } from './TestNetContent';
import { WelcomeContent } from './WelcomeContent';

const InstructionsTab = () => {
  const [activeTab, setActiveTab] = useState('devnet');

  return (
    <div className="min-w-4xl mx-auto p-6">
      <div className="flex space-x-1 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('devnet')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
            activeTab === 'devnet'
              ? 'bg-gray-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Devnet
        </button>
        <button
          onClick={() => setActiveTab('testnet')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
            activeTab === 'testnet'
              ? 'bg-gray-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Testnet
        </button>
      </div>

      <div className="mt-4 ">
        {activeTab === 'devnet' ? (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold dark:text-white text-gray-800 mb-4`}>Devnet Instructions</h2>
            <WelcomeContent />
            <Login />
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold dark:text-white text-gray-800 mb-4`}>Testnet Instructions</h2>
            <TestNetContent />
            <KeplrWalletConnector />
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructionsTab;