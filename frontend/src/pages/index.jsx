import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [wallet, setWallet] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await axios.get('http://localhost:3333/wallet');
        setWallet(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold text-blue-500">Payment App</h1>
      {loading ? (
        <p>Loading...</p>
      ) : wallet.length === 0 ? (
        <p>User not found.</p>
      ) : (
        <>
          <h2 className="text-4xl font-bold text-black mt-5">Welcome, {wallet.map((w) => w.user.name)}</h2>
          <h2 className="text-4xl font-bold text-black mt-5">Your Wallet: {wallet.map((w) => w.balance)}</h2>
          <p className="mt-4 text-gray-600">Welcome to the payment application</p>
          <p className="mt-4 text-gray-600">Please select an option below</p>
          <div className="mt-8 space-x-4">
            <Link href="/deposit" className="px-4 py-2 bg-blue-500 text-white rounded-full">
              Deposit
            </Link>
            <Link href="/withdraw"  className="px-4 py-2 bg-green-500 text-white rounded-full">
             Withdraw
            </Link>
            <Link href="/payment"  className="px-4 py-2 bg-yellow-500 text-white rounded-full">
             Payment
            </Link>
            <Link href="/history" className="px-4 py-2 bg-gray-500 text-white rounded-full">
              Transaction History
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
