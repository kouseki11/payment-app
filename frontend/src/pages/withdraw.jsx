import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Withdraw() {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdraw = async () => {
    setIsLoading(true);
    try {
     await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await axios.post('http://localhost:3333/withdrawal', {
        amount: amount
      });
      setMessage(`Withdraw ${response.data.status === 1 ? 'successful' : 'failed'}`);
    } catch (error) {
      setMessage('Withdraw failed');
    }
    
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-2xl font-bold text-green-500 mb-6">Withdraw</h1>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="mt-4 p-3 border rounded-md outline-none focus:border-green-500 w-80"
      />
      <div className="flex gap-2">
      <button
          onClick={handleWithdraw}
          className={`mt-6 px-6 py-3 text-white rounded-md transition duration-300 ease-in-out w-50 ${isLoading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Withdraw'}
        </button>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out w-50"
      >
        Back
      </Link>
      </div>
      {message == 'Withdraw successful' ? <p className="mt-4 text-sm text-green-600">{message}</p> : <p className="mt-4 text-sm text-red-600">{message}</p>}
    </div>
  );
}
