import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Payment() {
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3333/products");
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  const handleAmountChange = (productId, value) => {
    setAmount((prevAmount) => ({
      ...prevAmount,
      [productId]: value,
    }));
  };

  const handlePayment = async (product) => {
    setLoading((prevLoading) => ({ ...prevLoading, [product.id]: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await axios.post("http://localhost:3333/payment", {
        amount: amount[product.id] || "",
        productId: product.id,
      });
      setMessage(`Payment ${response.data.status === 1 ? 'successful' : 'failed'}`);
      setAmount((prevAmount) => ({
        ...prevAmount,
        [product.id]: "", 
      }));
    } catch (error) {
      setMessage("Payment failed");
    } finally {
      setTimeout(() => {
        setLoading((prevLoading) => ({ ...prevLoading, [product.id]: false }));
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-blue-500 mb-6">Make a Payment</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
            <input
              type="text"
              value={amount[product.id] || ""}
              onChange={(e) => handleAmountChange(product.id, e.target.value)}
              placeholder="Amount"
              className="mt-4 p-3 border rounded-md outline-none focus:border-blue-500 w-80"
            />
            <button
              className="mt-6 ml-2 px-4 py-2 bg-yellow-500 text-white rounded-full"
              onClick={() => handlePayment(product)}
              disabled={loading[product.id]} 
            >
              {loading[product.id] ? "Processing..." : "Pay"}
            </button>
          </div>
        ))}
      </div>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out w-50"
      >
        Back
      </Link>
      {message == 'Payment successful' ? <p className="mt-4 text-sm text-green-600">{message}</p> : <p className="mt-4 text-sm text-red-600">{message}</p>}
    </div>
  );
}
