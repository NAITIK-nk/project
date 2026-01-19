/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    try {
      const o = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(o);
    } catch {
      setOrders([]);
    }
  }, []);

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center">
        <h2 className="text-2xl font-bold">No Orders Yet</h2>
        <p className="mt-4 text-gray-600">Your orders will appear here after purchase.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order, idx) => (
          <div key={idx} className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-gray-500">Order ID</div>
                <div className="font-mono font-semibold">{order.orderId}</div>
              </div>
              <div className="text-sm text-gray-600">Total: ₹{order.total.toLocaleString()}</div>
            </div>
            <ul>
              {order.items.map((it: any, i: number) => (
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
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
