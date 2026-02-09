import React from 'react';

const TrustSignals: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-center my-6">
      <div className="flex items-start sm:items-center gap-3">
        <div className="w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">✓</div>
        <div>
          <div className="text-sm font-semibold">100% Authentic</div>
          <div className="text-xs text-gray-500">Verified by our specialists</div>
        </div>
      </div>
      <div className="flex items-start sm:items-center gap-3">
        <div className="w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">✓</div>
        <div>
          <div className="text-sm font-semibold">Manufacturer Warranty</div>
          <div className="text-xs text-gray-500">Genuine warranty included</div>
        </div>
      </div>
      <div className="flex items-start sm:items-center gap-3">
        <div className="w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">✓</div>
        <div>
          <div className="text-sm font-semibold">Secure Checkout</div>
          <div className="text-xs text-gray-500">Encrypted payments</div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;
