import React, { useState } from 'react';
import { X, ShieldCheck, Check, CreditCard, Truck, Banknote } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: number;
  discountCode: string;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discount,
  discountCode,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: 'Aanya Sharma',
    email: 'aanya.sharma@example.com',
    phone: '+91 98765 43210',
    address: '42/1, 12th Main Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560038',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'applepay'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('883');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.isBundle ? 799.0 : item.product.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const shippingCost = shippingMethod === 'express' ? 99.0 : subtotal >= 499.0 ? 0.0 : 49.0;
  const grandTotal = Math.max(0, subtotal - discount + shippingCost);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `SPY-${Math.floor(1000 + Math.random() * 9000)}`;
      const order: OrderDetails = {
        orderId: orderNumber,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        address: formData.address,
        city: `${formData.city}, ${formData.state}`,
        postalCode: formData.postalCode,
        shippingMethod: shippingMethod === 'express' ? 'Express 2-Day Air' : 'Standard Carbon-Neutral Ground',
        shippingCost,
        items,
        subtotal,
        discount,
        total: grandTotal,
        paymentMethod:
          paymentMethod === 'card'
            ? 'Credit Card (Ending in 4242)'
            : paymentMethod === 'applepay'
            ? 'Apple Pay / Digital Wallet'
            : 'Cash on Delivery (Verified)',
      };

      setIsSubmitting(false);
      onOrderSuccess(order);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1E2320]/65 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl border border-[#E8E3DC] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E3DC] bg-[#FFFFFF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-normal text-[#1E2320]">
              soapy checkout
            </span>
            <span aria-hidden="true" className="text-[#1E2320]/40">·</span>
            <span className="text-xs text-[#536B59] font-medium">Secure SSL Order</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="text-[#1E2320]/50 hover:text-[#1E2320] p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 flex-1 space-y-6">
          {/* Customer & Shipping Details */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#536B59] mb-3">
              01. Shipping Destination
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[#1E2320]/70 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E8E3DC] rounded-md text-[#1E2320] focus:outline-hidden focus:border-[#536B59]"
                />
              </div>
              <div>
                <label className="block text-[#1E2320]/70 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E8E3DC] rounded-md text-[#1E2320] focus:outline-hidden focus:border-[#536B59]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[#1E2320]/70 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E8E3DC] rounded-md text-[#1E2320] focus:outline-hidden focus:border-[#536B59]"
                />
              </div>
              <div>
                <label className="block text-[#1E2320]/70 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E8E3DC] rounded-md text-[#1E2320] focus:outline-hidden focus:border-[#536B59]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#1E2320]/70 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E8E3DC] rounded-md text-[#1E2320] focus:outline-hidden focus:border-[#536B59]"
                  />
                </div>
                <div>
                  <label className="block text-[#1E2320]/70 mb-1">ZIP / Postal</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E8E3DC] rounded-md text-[#1E2320] focus:outline-hidden focus:border-[#536B59]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Speed */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#536B59] mb-3">
              02. Delivery Method
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label
                onClick={() => setShippingMethod('standard')}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'standard'
                    ? 'border-[#2E3E32] bg-[#FFFFFF] shadow-xs'
                    : 'border-[#E8E3DC] bg-[#FFFFFF] hover:border-[#536B59]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-[#536B59]" />
                  <div>
                    <div className="font-semibold text-[#1E2320]">Standard Eco Ground</div>
                    <div className="text-[#1E2320]/60 text-[11px]">3–5 business days</div>
                  </div>
                </div>
                <span className="font-mono tabular-nums font-semibold text-[#1E2320]">
                  {subtotal >= 499 ? 'FREE' : '₹49'}
                </span>
              </label>

              <label
                onClick={() => setShippingMethod('express')}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'express'
                    ? 'border-[#2E3E32] bg-[#FFFFFF] shadow-xs'
                    : 'border-[#E8E3DC] bg-[#FFFFFF] hover:border-[#536B59]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-[#536B59]" />
                  <div>
                    <div className="font-semibold text-[#1E2320]">Express Air Delivery</div>
                    <div className="text-[#1E2320]/60 text-[11px]">1–2 business days</div>
                  </div>
                </div>
                <span className="font-mono tabular-nums font-semibold text-[#1E2320]">₹99</span>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#536B59] mb-3">
              03. Payment Preference
            </h3>
            <div className="grid grid-cols-3 gap-2.5 mb-3 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('applepay')}
                className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                  paymentMethod === 'applepay'
                    ? 'border-[#2E3E32] bg-[#FFFFFF] font-semibold text-[#1E2320]'
                    : 'border-[#E8E3DC] bg-[#FFFFFF] text-[#1E2320]/75 hover:border-[#536B59]'
                }`}
              >
                <span className="block text-xs font-bold text-[#536B59] mb-1">UPI / QR</span>
                GPay / PhonePe
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-[#2E3E32] bg-[#FFFFFF] font-semibold text-[#1E2320]'
                    : 'border-[#E8E3DC] bg-[#FFFFFF] text-[#1E2320]/75 hover:border-[#536B59]'
                }`}
              >
                <CreditCard className="w-4 h-4 mx-auto mb-1 text-[#536B59]" />
                Cards
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-[#2E3E32] bg-[#FFFFFF] font-semibold text-[#1E2320]'
                    : 'border-[#E8E3DC] bg-[#FFFFFF] text-[#1E2320]/75 hover:border-[#536B59]'
                }`}
              >
                <Banknote className="w-4 h-4 mx-auto mb-1 text-[#536B59]" />
                Cash on Delivery
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E8E3DC] space-y-3 text-xs">
                <div>
                  <label className="block text-[#1E2320]/70 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E3DC] rounded-md font-mono text-[#1E2320]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1E2320]/70 mb-1">Expires</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E3DC] rounded-md font-mono text-[#1E2320]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1E2320]/70 mb-1">Security CVC</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E3DC] rounded-md font-mono text-[#1E2320]"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="bg-stone-50 p-4 rounded-xl border border-[#E8E3DC] text-xs text-[#1E2320]/80 leading-relaxed">
                <p className="font-semibold text-[#1E2320] mb-1">Cash on Delivery Terms</p>
                Please keep exact cash of <strong>₹{grandTotal.toFixed(0)}</strong> ready upon doorstep delivery. Our courier will provide an instant physical receipt.
              </div>
            )}
          </div>

          {/* Order Summary & Submit Button */}
          <div className="pt-4 border-t border-[#E8E3DC]">
            <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E8E3DC] space-y-1.5 text-xs text-[#1E2320]/80 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} items)</span>
                <span className="font-mono tabular-nums">₹{subtotal.toFixed(0)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount ({discountCode})</span>
                  <span className="font-mono tabular-nums">-₹{discount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-mono tabular-nums">
                  {shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(0)}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#1E2320] pt-2 border-t border-[#F4EFEB]">
                <span>Total Due</span>
                <span className="font-mono tabular-nums text-base">₹{grandTotal.toFixed(0)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#2E3E32] hover:bg-[#1E2320] text-[#FAF8F5] rounded-md text-xs font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#FAF8F5]/40 border-t-[#FAF8F5] rounded-full animate-spin" />
                  <span>Confirming Order...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize & Place Order · ₹{grandTotal.toFixed(0)}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
