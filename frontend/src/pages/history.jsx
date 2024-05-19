import { useEffect, useState } from 'react';
import axios from 'axios';

export default function History() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await axios.get('http://localhost:3333/history');
            setTransactions(response.data);
        };

        fetchTransactions();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
            <h1 className="text-2xl font-bold text-blue-600 mb-6">Transaction History</h1>
            <ul className="w-full max-w-4xl bg-white rounded-lg shadow-md">
                {transactions.map((transaction) => (
                    <li
                        key={transaction.order_id}
                        className="p-4 border-b border-gray-200 last:border-none flex justify-between items-center"
                    >
                        <div>
                            <div className="text-gray-800 font-semibold">{transaction.type}</div>
                            <div className="text-sm text-gray-500">
                                {new Date(transaction.createdAt).toLocaleString()}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={`text-lg font-bold ${transaction.type === 'Payment' || transaction.type === 'Withdrawal' ? 'text-red-500' : 'text-green-500'}`}>
                                {transaction.type === 'Payment' || transaction.type === 'Withdrawal' ? '-' : ''}{transaction.amount}
                            </div>
                            <div className={`text-sm ${transaction.status == 1 ? 'text-green-500' : 'text-red-500'}`}>
                                {transaction.status == 1 ? 'Success' : 'Failed'}
                            </div>
                            <div className="text-sm text-gray-500">Order ID: {transaction.order_id}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
