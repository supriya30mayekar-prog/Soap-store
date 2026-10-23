import React from 'react';
import { Check, Printer, ArrowRight, Package, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderSuccessModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1E2320]/75 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl border border-[#E8E3DC] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Receipt Header */}
        <div className="px-6 py-5 bg-[#2E3E32] text-[#FAF8F5] text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF8F5]/10 flex items-center justify-center mb-3">
            <Check className="w-6 h-6 text-emerald-300 stroke-[2.5]" />
          </div>
          <div className="text-xs uppercase tracking-wider text-emerald-300 font-mono font-medium">
            Order Confirmed · Preparing Shipment
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal mt-1 tracking-tight">
            Thank you, {order.customerName.split(' ')[0]}
          </h2>
          <div className="text-xs text-[#FAF8F5]/80 mt-1 font-mono">
            Confirmation Reference: {order.orderId}
          </div>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1 space-y-6">
          {/* Tracking Timeline */}
          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E8E3DC]">
            <div className="text-xs font-semibold text-[#536B59] uppercase tracking-wider mb-4">
              Estimated Delivery: 3–5 Business Days
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs relative">
              <div className="space-y-1">
                <div className="w-7 h-7 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[11px]">
                  ✓
                </div>
                <div className="font-semibold text-[#1E2320]">Order Logged</div>
                <div className="text-[10px] text-[#1E2320]/60">Batch reserved</div>
              </div>

              <div className="space-y-1">
                <div className="w-7 h-7 mx-auto rounded-full bg-[#F4EFEB] text-[#536B59] flex items-center justify-center font-bold text-[11px]">
                  2
                </div>
                <div className="font-semibold text-[#1E2320]">Hand Wrapping</div>
                <div className="text-[10px] text-[#1E2320]/60">Kraft paper inspection</div>
              </div>

              <div className="space-y-1">
                <div className="w-7 h-7 mx-auto rounded-full bg-[#F4EFEB] text-[#1E2320]/40 flex items-center justify-center font-bold text-[11px]">
                  3
                </div>
                <div className="font-semibold text-[#1E2320]/50">Eco Dispatch</div>
                <div className="text-[10px] text-[#1E2320]/40">Tracking link via email</div>
              </div>
            </div>
          </div>

          {/* Itemized Order Breakdown */}
          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E8E3DC]">
            <div className="text-xs font-semibold text-[#1E2320] mb-3">
              Itemized Order Summary
            </div>

            <div className="divide-y divide-[#F4EFEB] text-xs">
              {order.items.map((item, idx) => {
                const itemPrice = item.isBundle ? 799.0 : item.product.price;
                return (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-10 h-10 rounded object-cover bg-[#F4EFEB] border border-[#E8E3DC]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-medium text-[#1E2320]">
                          {item.isBundle ? 'Botanical 3-Bar Trio Bundle' : item.product.name}
                        </div>
                        <div className="text-[11px] text-[#1E2320]/60">
                          Qty: {item.quantity} · {item.isBundle ? 'With Wooden Dish' : item.product.weight}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono tabular-nums font-semibold text-[#1E2320]">
                      ₹{(itemPrice * item.quantity).toFixed(0)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Financial totals */}
            <div className="pt-4 mt-2 border-t border-[#E8E3DC] space-y-1.5 text-xs text-[#1E2320]/75">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#1E2320]">₹{order.subtotal.toFixed(0)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount Savings</span>
                  <span className="font-mono tabular-nums">-₹{order.discount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({order.shippingMethod})</span>
                <span className="font-mono tabular-nums text-[#1E2320]">
                  {order.shippingCost === 0 ? 'FREE' : `₹${order.shippingCost.toFixed(0)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1E2320] pt-2 border-t border-[#F4EFEB]">
                <span>Total Paid</span>
                <span className="font-mono tabular-nums">₹{order.total.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Shipping destination & payment info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E8E3DC]">
              <div className="font-semibold text-[#1E2320] mb-1">Delivering To</div>
              <div className="text-[#1E2320]/75">{order.customerName}</div>
              <div className="text-[#1E2320]/75">{order.address}</div>
              <div className="text-[#1E2320]/75">{order.city} {order.postalCode}</div>
              <div className="text-[#1E2320]/60 mt-1 font-mono">{order.customerPhone}</div>
            </div>

            <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E8E3DC]">
              <div className="font-semibold text-[#1E2320] mb-1">Payment Method</div>
              <div className="text-[#1E2320]/75">{order.paymentMethod}</div>
              <div className="text-[#1E2320]/60 mt-1">Receipt emailed to:</div>
              <div className="text-[#536B59] font-mono">{order.customerEmail}</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-[#E8E3DC] bg-[#FFFFFF] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2.5 bg-[#FAF8F5] border border-[#E8E3DC] text-xs font-medium text-[#1E2320] hover:bg-[#F4EFEB] rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Order Receipt</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#2E3E32] hover:bg-[#1E2320] text-[#FAF8F5] text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Continue Exploring soapy</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
