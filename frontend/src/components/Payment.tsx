import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaymentFormData {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: string;
}

interface PaymentErrors {
  cardholderName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  amount?: string;
}

interface PaymentStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function Payment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PaymentFormData>({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: '',
  });

  const [errors, setErrors] = useState<PaymentErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<PaymentStatus>({
    type: 'idle',
    message: '',
  });

  /* ---------------- VALIDATIONS ---------------- */

  const validateCardholderName = (name: string) => {
    if (!name.trim()) return 'Cardholder name is required';
    if (name.length < 3) return 'Minimum 3 characters';
  };

  const validateCardNumber = (num: string) => {
    const c = num.replace(/\s/g, '');
    if (!/^\d{16}$/.test(c)) return 'Invalid card number';

    let sum = 0;
    let even = false;
    for (let i = c.length - 1; i >= 0; i--) {
      let d = parseInt(c[i]);
      if (even) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      sum += d;
      even = !even;
    }
    if (sum % 10 !== 0) return 'Invalid card number';
  };

  const validateExpiry = (v: string) => {
    if (!/^\d{2}\/\d{2}$/.test(v)) return 'MM/YY format required';
    const [m, y] = v.split('/').map(Number);
    const now = new Date();
    const cy = now.getFullYear() % 100;
    const cm = now.getMonth() + 1;
    if (m < 1 || m > 12) return 'Invalid month';
    if (y < cy || (y === cy && m < cm)) return 'Card expired';
  };

  const validateCVV = (v: string) => {
    if (!/^\d{3,4}$/.test(v)) return 'Invalid CVV';
  };

  const validateAmount = (v: string) => {
    const n = parseFloat(v);
    if (!n || n <= 0) return 'Invalid amount';
  };

  /* ---------------- FORMATTERS ---------------- */

  const formatCard = (v: string) =>
    v.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ').slice(0, 19) || '';

  const formatExpiry = (v: string) => {
    const c = v.replace(/\D/g, '');
    return c.length >= 2 ? `${c.slice(0, 2)}/${c.slice(2, 4)}` : c;
  };

  /* ---------------- HANDLERS ---------------- */

  const validateField = (n: keyof PaymentFormData, v: string) => {
    const validators: Partial<Record<keyof PaymentFormData, (val: string) => string | undefined>> = {
      cardholderName: validateCardholderName,
      cardNumber: validateCardNumber,
      expiryDate: validateExpiry,
      cvv: validateCVV,
      amount: validateAmount,
    };
    setErrors(e => ({ ...e, [n]: validators[n]?.(v) }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let v = value;

    if (name === 'cardNumber') v = formatCard(value);
    if (name === 'expiryDate') v = formatExpiry(value);
    if (name === 'cvv') v = value.replace(/\D/g, '').slice(0, 4);
    if (name === 'amount') v = value.replace(/[^\d.]/g, '');

    const key = name as keyof PaymentFormData;
    setFormData(f => ({ ...f, [key]: v }));
    if (touched.has(name)) validateField(key, v);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(t => new Set(t).add(name));
    validateField(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errs: PaymentErrors = {
      cardholderName: validateCardholderName(formData.cardholderName),
      cardNumber: validateCardNumber(formData.cardNumber),
      expiryDate: validateExpiry(formData.expiryDate),
      cvv: validateCVV(formData.cvv),
      amount: validateAmount(formData.amount),
    };

    setErrors(errs);
    setTouched(new Set(Object.keys(errs)) as Set<string>);

    if (Object.values(errs).some(Boolean)) {
      setStatus({ type: 'error', message: 'Fix errors before submitting' });
      return;
    }

    setStatus({ type: 'loading', message: 'Processing payment...' });

    setTimeout(() => {
      setStatus({
        type: 'success',
        message: `Payment ₹${formData.amount} successful`,
      });

      // Create mock order and persist to localStorage
      try {
        const cartRaw = localStorage.getItem('cartItems');
        const cart: { price: number; quantity: number }[] = cartRaw ? JSON.parse(cartRaw) : [];
        const total = Number(formData.amount) || cart.reduce((s: number, it: { price: number; quantity: number }) => s + it.price * it.quantity, 0);
        const order = {
          orderId: `ORD-${Date.now().toString(36).toUpperCase().slice(-8)}`,
          items: cart,
          total,
          createdAt: new Date().toISOString(),
        };

        // Save lastOrder and push to orders list
        localStorage.setItem('lastOrder', JSON.stringify(order));
        const existing = JSON.parse(localStorage.getItem('orders') || '[]');
        existing.unshift(order);
        localStorage.setItem('orders', JSON.stringify(existing));

        localStorage.removeItem('cartItems');
      } catch (e) {
        console.error('Failed to create order', e);
      }

      setTimeout(() => navigate('/order-success'), 1000);
    }, 2000);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 p-8 shadow-lg">

        {/* HEADER */}
        <div className="flex items-center justify-center mb-6">
          <CreditCard className="w-8 h-8 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">
            Secure Payment
          </h1>
        </div>

        {/* STATUS */}
        {status.type !== 'idle' && (
          <p className={`mb-4 text-sm text-center ${
            status.type === 'error'
              ? 'text-red-600'
              : status.type === 'success'
              ? 'text-green-600'
              : 'text-indigo-600'
          }`}>
            {status.message}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {(
            [
              { name: 'cardholderName' as const, label: 'Cardholder Name' },
              { name: 'cardNumber' as const, label: 'Card Number' },
              { name: 'expiryDate' as const, label: 'Expiry MM/YY' },
              { name: 'cvv' as const, label: 'CVV' },
              { name: 'amount' as const, label: 'Amount (₹)' },
            ] as { name: keyof PaymentFormData; label: string }[]
          ).map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {f.label}
              </label>
              <input
                name={f.name}
                value={formData[f.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 rounded-lg bg-white text-gray-900
                placeholder-gray-400 border focus:ring-2 focus:ring-indigo-500
                ${errors[f.name as keyof PaymentErrors]
                  ? 'border-red-500'
                  : 'border-gray-300'
                }`}
              />
              {errors[f.name as keyof PaymentErrors] && touched.has(f.name) && (
                <p className="text-xs text-red-500 mt-1">
                  {errors[f.name as keyof PaymentErrors]}
                </p>
              )}
            </div>
          ))}

          {/* BUTTON */}
          <button
            disabled={status.type === 'loading'}
            className="w-full mt-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700
            text-white font-semibold flex items-center justify-center gap-2
            transition disabled:opacity-60">
            <Lock className="w-5 h-5" />
            Pay Securely
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-gray-500 text-center mt-6">
          🔒 256-bit SSL Encrypted • Test card: 4242 4242 4242 4242
        </p>
      </div>
    </div>
  );
}
