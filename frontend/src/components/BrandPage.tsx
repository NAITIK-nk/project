/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import watchesData from '../data/watches.json';
import { Heart, ShoppingCart, Shuffle } from 'lucide-react';
import TrustSignals from './TrustSignals';
const BrandPage: React.FC<{ addToCart: any; favorites: Set<number>; toggleFavorite: (id: number) => void }> = ({ addToCart, favorites, toggleFavorite }) => {
  const { brandName } = useParams();

  // Build product objects with stable numeric ids (similar to Products.tsx)
  const products = useMemo(() => {
    let counter = 1;
    return (watchesData as any[]).flatMap((b) =>
      b.watches.map((w: any) => ({ id: counter++, ...w, brand: b.brand }))
    );
  }, []);

  const brandBlock = (watchesData as any[]).find((b: any) => b.brand.toLowerCase() === (brandName || '').toLowerCase());

  if (!brandBlock) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center">
        <h2 className="text-2xl font-bold">Brand not found</h2>
        <p className="mt-4 text-gray-600">We couldn't find that brand.</p>
      </div>
    );
  }

  const brandProducts = products.filter((p) => p.brand.toLowerCase() === brandBlock.brand.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">{brandBlock.brand}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Curated selection of authentic {brandBlock.brand} timepieces from trusted partners.</p>
      </div>

      <TrustSignals />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {brandProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl">
            <div className="relative aspect-square overflow-hidden">
              {product.isOnSale && <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">Sale</span>}
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <button onClick={() => toggleFavorite(product.id)} className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"><Heart className={`h-5 w-5 ${favorites.has(product.id) ? 'text-red-500 fill-current' : 'text-gray-700'}`} /></button>
                <button onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })} className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"><ShoppingCart className="h-5 w-5 text-gray-700"/></button>
                <button onClick={() => { try { const raw = localStorage.getItem('compareList'); const list = raw ? JSON.parse(raw) : []; const exists = list.find((p:any) => p.id === product.id); const next = exists ? list.filter((p:any) => p.id !== product.id) : [...list, product].slice(0,3); localStorage.setItem('compareList', JSON.stringify(next)); } catch { } }} className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"><Shuffle className={`h-5 w-5 text-gray-700`} /></button>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
              <div className="text-2xl font-bold text-yellow-600">₹{product.price.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandPage;
