import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Deposit() {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDeposit = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      const response = await axios.post('http://localhost:3333/deposit', {
        amount: amount
      });
      setMessage(`Deposit ${response.data.status === 1 ? 'successful' : 'failed'}`);
    } catch (error) {
      setMessage('Deposit failed');
    }
    setTimeout(() => setIsLoading(false), 2000);
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-2xl font-bold text-blue-500 mb-6">Deposit</h1>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="mt-4 p-3 border rounded-md outline-none focus:border-blue-500 w-80"
      />
      <div className="flex gap-2">
        <button
          onClick={handleDeposit}
          className={`mt-6 px-6 py-3 text-white rounded-md transition duration-300 ease-in-out w-50 ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Deposit'}
        </button>
        <Link
          href="/"
          className="mt-6 px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out w-50"
        >
          Back
        </Link>
      </div>
      {message == 'Deposit successful' ? <p className="mt-4 text-sm text-green-600">{message}</p> : <p className="mt-4 text-sm text-red-600">{message}</p>}
    </div>
  );
}
