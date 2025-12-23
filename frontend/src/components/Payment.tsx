import React, { useState } from 'react';
import { CreditCard, AlertCircle, CheckCircle, Lock } from 'lucide-react';
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

  // Validation functions
  const validateCardholderName = (name: string): string | undefined => {
    if (!name.trim()) return 'Cardholder name is required';
    if (name.trim().length < 3) return 'Name must be at least 3 characters';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name should contain only letters';
    return undefined;
  };

  const validateCardNumber = (number: string): string | undefined => {
    const cleaned = number.replace(/\s/g, '');
    if (!cleaned) return 'Card number is required';
    if (!/^\d+$/.test(cleaned)) return 'Card number should contain only digits';
    if (cleaned.length !== 16) return 'Card number must be 16 digits';
    
    // Luhn algorithm for card validation
    let sum = 0;
    let isEven = false;
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i]);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    if (sum % 10 !== 0) return 'Invalid card number';
    return undefined;
  };

  const validateExpiryDate = (expiry: string): string | undefined => {
    if (!expiry) return 'Expiry date is required';
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return 'Format must be MM/YY';
    
    const [month, year] = expiry.split('/').map(Number);
    if (month < 1 || month > 12) return 'Invalid month';
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Card has expired';
    }
    
    return undefined;
  };

  const validateCVV = (cvv: string): string | undefined => {
    if (!cvv) return 'CVV is required';
    if (!/^\d{3,4}$/.test(cvv)) return 'CVV must be 3 or 4 digits';
    return undefined;
  };

  const validateAmount = (amount: string): string | undefined => {
    if (!amount) return 'Amount is required';
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return 'Amount must be greater than 0';
    if (numAmount > 1000000) return 'Amount too large';
    return undefined;
  };

  // Format card number with spaces
  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substring(0, 19);
  };

  // Format expiry date with slash
  const formatExpiryDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    } else if (name === 'amount') {
      // Allow only numbers and decimal point
      formattedValue = value.replace(/[^\d.]/g, '');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Real-time validation if field has been touched
    if (touched.has(name)) {
      validateField(name, formattedValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => new Set(prev).add(name));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error: string | undefined;
    
    switch (name) {
      case 'cardholderName':
        error = validateCardholderName(value);
        break;
      case 'cardNumber':
        error = validateCardNumber(value);
        break;
      case 'expiryDate':
        error = validateExpiryDate(value);
        break;
      case 'cvv':
        error = validateCVV(value);
        break;
      case 'amount':
        error = validateAmount(value);
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateAllFields = (): boolean => {
    const newErrors: PaymentErrors = {
      cardholderName: validateCardholderName(formData.cardholderName),
      cardNumber: validateCardNumber(formData.cardNumber),
      expiryDate: validateExpiryDate(formData.expiryDate),
      cvv: validateCVV(formData.cvv),
      amount: validateAmount(formData.amount),
    };
    
    setErrors(newErrors);
    setTouched(new Set(['cardholderName', 'cardNumber', 'expiryDate', 'cvv', 'amount']));
    
    return !Object.values(newErrors).some(error => error !== undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAllFields()) {
      setStatus({
        type: 'error',
        message: 'Please fix all errors before submitting',
      });
      return;
    }
    
    setStatus({ type: 'loading', message: 'Processing payment securely...' });

    // Simulate API call
    setTimeout(() => {
      setStatus({
        type: 'success',
        message: `Payment of ₹${parseFloat(formData.amount).toFixed(2)} processed successfully!`,
      });
      
      // Clear form after successful payment
      setTimeout(() => {
        setFormData({
          cardholderName: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          amount: '',
        });
        setErrors({});
        setTouched(new Set());
        
        // Clear cart and redirect
        localStorage.removeItem('cartItems');
        setTimeout(() => navigate('/'), 2000);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <CreditCard className="w-8 h-8 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Secure Payment</h1>
        </div>

        {status.type !== 'idle' && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              status.type === 'success'
                ? 'bg-green-50 border border-green-200'
                : status.type === 'error'
                ? 'bg-red-50 border border-red-200'
                : 'bg-blue-50 border border-blue-200'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            ) : status.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            ) : (
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mt-0.5 flex-shrink-0" />
            )}
            <p
              className={`text-sm ${
                status.type === 'success'
                  ? 'text-green-800'
                  : status.type === 'error'
                  ? 'text-red-800'
                  : 'text-blue-800'
              }`}
            >
              {status.message}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name *
            </label>
            <input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="John Doe"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                errors.cardholderName && touched.has('cardholderName')
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              disabled={status.type === 'loading'}
            />
            {errors.cardholderName && touched.has('cardholderName') && (
              <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number *
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                errors.cardNumber && touched.has('cardNumber')
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              disabled={status.type === 'loading'}
            />
            {errors.cardNumber && touched.has('cardNumber') && (
              <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date *
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="MM/YY"
                maxLength={5}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.expiryDate && touched.has('expiryDate')
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                disabled={status.type === 'loading'}
              />
              {errors.expiryDate && touched.has('expiryDate') && (
                <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV *
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="123"
                maxLength={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.cvv && touched.has('cvv') ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={status.type === 'loading'}
              />
              {errors.cvv && touched.has('cvv') && (
                <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹) *
            </label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="0.00"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                errors.amount && touched.has('amount') ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={status.type === 'loading'}
            />
            {errors.amount && touched.has('amount') && (
              <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status.type === 'loading' || status.type === 'success'}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-6 flex items-center justify-center gap-2"
          >
            {status.type === 'loading' ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Pay Now Securely
              </>
            )}
          </button>
        </form>

        <div className="mt-6 space-y-2">
          <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Secured with 256-bit SSL encryption
          </p>
          <p className="text-xs text-indigo-600 text-center font-medium">
            Test card: 4242 4242 4242 4242 | Any future date | Any CVV
          </p>
        </div>
      </div>
    </div>
  );
}
