/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  const last = (() => {
    try { return JSON.parse(localStorage.getItem('lastOrder') || 'null'); } catch { return null; }
  })();

  if (!last) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center">
        <h2 className="text-2xl font-bold">No recent order</h2>
        <p className="mt-4 text-gray-600">We couldn't find your recent order.</p>
        <Link to="/products" className="mt-6 inline-block bg-yellow-600 text-white px-6 py-3 rounded-md">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Order Confirmed</h2>
      <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>

      <div className="bg-white rounded-lg p-6 shadow">
        <div className="text-left mb-4">
          <div className="text-sm text-gray-500">Order ID</div>
          <div className="font-mono font-semibold">{last.orderId}</div>
        </div>

        <div className="text-left mb-4">
          <div className="text-sm text-gray-500">Items</div>
          <ul className="mt-2">
            {last.items.map((it: any, i: number) => (
              <li key={i} className="py-2 border-b last:border-b-0 flex justify-between">
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-gray-500">Qty: {it.quantity}</div>
                </div>
                <div className="font-semibold">₹{(it.price * it.quantity).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-right font-bold">Total: ₹{last.total.toLocaleString()}</div>
      </div>

      <div className="mt-6">
        <Link to="/my-orders" className="text-sm text-gray-700 hover:underline">View Your Orders</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
