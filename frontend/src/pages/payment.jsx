import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Payment() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:3333/products');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  const handlePayment = async (product) => {
    try {
      const response = await axios.post('http://localhost:3333/payment', { productId: product.id });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Payment failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-blue-500 mb-6">Make a Payment</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
            <p className="mt-4 text-lg font-semibold text-blue-500">${product.price}</p>
            <button
              className="mt-6 px-4 py-2 bg-yellow-500 text-white rounded-full"
              onClick={() => handlePayment(product)}
            >
              Pay
            </button>
          </div>
        ))}
      </div>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}
