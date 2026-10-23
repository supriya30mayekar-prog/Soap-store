import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: (appliedDiscount: number, discountCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 499.0;

  const subtotal = items.reduce((sum, item) => {
    // If it's a 3-bar bundle, bundle price is ₹799
    const itemPrice = item.isBundle ? 799.0 : item.product.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const discountPercent = promoApplied ? 0.1 : 0;
  const discountAmount = subtotal * discountPercent;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'SOAPY10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "SOAPY10"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#1E2320]/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E8E3DC] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#E8E3DC] bg-[#FFFFFF] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-medium text-[#1E2320]">
                Your Shopping Bag
              </span>
              <span className="text-xs font-mono tabular-nums text-[#1E2320]/60 bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8E3DC]">
                {items.reduce((acc, it) => acc + it.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close bag"
              className="text-[#1E2320]/50 hover:text-[#1E2320] p-1.5 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-[#F4EFEB] border-b border-[#E8E3DC] text-xs">
            <div className="flex justify-between items-center mb-1.5 text-[#1E2320]/80">
              {amountToFreeShipping > 0 ? (
                <span>
                  Add <strong className="font-mono tabular-nums font-semibold text-[#1E2320]">₹{amountToFreeShipping.toFixed(0)}</strong> for Free Shipping
                </span>
              ) : (
                <span className="text-[#2E3E32] font-semibold flex items-center gap-1">
                  <span>Unlocked Free Shipping</span>
                </span>
              )}
              <span className="font-mono text-[11px] text-[#1E2320]/60">{progressPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E8E3DC] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#536B59] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#E8E3DC] flex items-center justify-center text-[#1E2320]/30 mb-4">
                  <Tag className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-lg text-[#1E2320] font-normal mb-1">
                  Your bag is currently empty
                </h4>
                <p className="text-xs text-[#1E2320]/65 max-w-xs mb-6 font-light leading-relaxed">
                  Explore our cold-process botanical bars or build your customized trio for ₹799.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#2E3E32] text-[#FAF8F5] text-xs font-semibold rounded-md hover:bg-[#1E2320] transition-colors cursor-pointer"
                >
                  Browse Botanical Soaps
                </button>
              </div>
            ) : (
              items.map((item, index) => {
                const itemPrice = item.isBundle ? 799.0 : item.product.price;

                return (
                  <div
                    key={index}
                    className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E8E3DC] flex gap-4 shadow-xs"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-18 rounded-lg object-cover bg-[#F4EFEB] shrink-0 border border-[#E8E3DC]"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-medium text-[#1E2320] truncate">
                            {item.isBundle ? 'Botanical 3-Bar Trio' : item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(index)}
                            className="text-[#1E2320]/40 hover:text-red-600 transition-colors cursor-pointer p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.isBundle && item.bundleItems ? (
                          <div className="text-[11px] text-[#536B59] mt-0.5 line-clamp-1">
                            {item.bundleItems.join(' + ')}
                          </div>
                        ) : (
                          <div className="text-[11px] text-[#1E2320]/60 mt-0.5">
                            {item.product.weight}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F4EFEB]">
                        {/* Stepper */}
                        <div className="flex items-center border border-[#E8E3DC] rounded bg-[#FAF8F5]">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="p-1 text-[#1E2320]/70 hover:text-[#1E2320] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-mono text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="p-1 text-[#1E2320]/70 hover:text-[#1E2320] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-mono text-sm font-semibold text-[#1E2320] tabular-nums">
                            ₹{(itemPrice * item.quantity).toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E8E3DC] bg-[#FFFFFF] space-y-4">
              {/* Promo code input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. SOAPY10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 bg-[#FAF8F5] border border-[#E8E3DC] rounded-md text-[#1E2320] uppercase placeholder:normal-case focus:outline-hidden focus:border-[#536B59]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#FAF8F5] border border-[#E8E3DC] text-xs font-medium text-[#1E2320] hover:bg-[#F4EFEB] rounded-md transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {promoApplied && (
                <div className="text-xs text-emerald-700 font-medium flex items-center justify-between">
                  <span>10% Welcome Discount applied</span>
                  <span className="font-mono tabular-nums">-₹{discountAmount.toFixed(0)}</span>
                </div>
              )}
              {promoError && (
                <div className="text-xs text-red-600 font-medium">
                  {promoError}
                </div>
              )}

              {/* Subtotal & Breakdown */}
              <div className="space-y-1.5 text-xs text-[#1E2320]/75 pt-2 border-t border-[#F4EFEB]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#1E2320] font-medium">
                    ₹{subtotal.toFixed(0)}
                  </span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount (SOAPY10)</span>
                    <span className="font-mono tabular-nums">-₹{discountAmount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-mono tabular-nums">
                    {amountToFreeShipping === 0 ? 'FREE' : '₹49'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#1E2320] pt-2 border-t border-[#E8E3DC]">
                  <span>Total</span>
                  <span className="font-mono tabular-nums">
                    ₹{(subtotal - discountAmount + (amountToFreeShipping === 0 ? 0 : 49)).toFixed(0)}
                  </span>
                </div>
              </div>

              {/* Primary Checkout CTA */}
              <button
                onClick={() => onProceedToCheckout(discountAmount, promoApplied ? 'SOAPY10' : '')}
                className="w-full py-3.5 bg-[#2E3E32] hover:bg-[#1E2320] text-[#FAF8F5] rounded-md text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-[#1E2320]/50 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#536B59]" />
                <span>30-Day Fresh Bar Guarantee · Plastic-Free Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
