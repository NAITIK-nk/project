/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

const Compare: React.FC = () => {
  const [compareList, setCompareList] = useState<any[]>([]);

  useEffect(() => {
    try { const ids = JSON.parse(localStorage.getItem('compareList') || '[]'); setCompareList(ids); } catch { setCompareList([]); }
  }, []);

  if (compareList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center">
        <h2 className="text-2xl font-bold">No items to compare</h2>
        <p className="mt-4 text-gray-600">Add watches to compare from the product list.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Compare Watches</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Feature</th>
              {compareList.map((p:any) => (<th key={p.id} className="p-4 text-left">{p.name}</th>))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4 font-semibold">Brand</td>
              {compareList.map((p:any) => (<td key={p.id} className="p-4">{p.brand}</td>))}
            </tr>
            <tr className="border-t">
              <td className="p-4 font-semibold">Price</td>
              {compareList.map((p:any) => (<td key={p.id} className="p-4">₹{p.price.toLocaleString()}</td>))}
            </tr>
            <tr className="border-t">
              <td className="p-4 font-semibold">Movement</td>
              {compareList.map((p:any) => (<td key={p.id} className="p-4">Automatic</td>))}
            </tr>
            <tr className="border-t">
              <td className="p-4 font-semibold">Case size</td>
              {compareList.map((p:any) => (<td key={p.id} className="p-4">40mm</td>))}
            </tr>
            <tr className="border-t">
              <td className="p-4 font-semibold">Water resistance</td>
              {compareList.map((p:any) => (<td key={p.id} className="p-4">100m</td>))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare;
