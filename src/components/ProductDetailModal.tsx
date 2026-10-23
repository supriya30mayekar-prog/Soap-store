import React, { useState } from 'react';
import { X, Plus, Minus, Check, Star, ShieldCheck, Droplets, Sparkles, Clock, Heart } from 'lucide-react';
import { SoapProduct } from '../types';

interface ProductDetailModalProps {
  soap: SoapProduct | null;
  onClose: () => void;
  onAddToCart: (soap: SoapProduct, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  soap,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'reviews'>('details');
  const [added, setAdded] = useState(false);

  if (!soap) return null;

  const handleAdd = () => {
    onAddToCart(soap, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1E2320]/65 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl border border-[#E8E3DC] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top bar with close */}
        <div className="px-6 py-3.5 border-b border-[#E8E3DC] flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex items-center gap-2 text-xs text-[#536B59] font-medium">
            <span>soapy botanical archive</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{soap.curingTime}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-[#1E2320]/50 hover:text-[#1E2320] p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Image Stage */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F4EFEB] border border-[#E8E3DC]">
                <img
                  src={soap.image}
                  alt={soap.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 text-[11px] font-mono tracking-wide uppercase bg-[#FAF8F5]/90 px-2 py-0.5 rounded border border-[#E8E3DC]">
                  {soap.weight}
                </div>
              </div>

              {/* Lather & Texture Quick Spec */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E8E3DC] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#1E2320]/60">Lather Profile</span>
                  <span className="font-medium text-[#1E2320]">{soap.latherType}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#1E2320]/60">Exfoliation</span>
                  <span className="font-medium text-[#1E2320]">{soap.exfoliationLevel}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#1E2320]/60">Hero Active</span>
                  <span className="font-medium text-[#536B59]">{soap.heroIngredient}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#536B59] font-medium mb-1">
                  <span>{soap.scentNotes.join(' · ')}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-[#1E2320] font-normal leading-tight">
                  {soap.name}
                </h2>

                <div className="flex items-center gap-3 mt-2.5 mb-4">
                  <span className="text-xl font-bold font-mono text-[#1E2320] tabular-nums">
                    ₹{soap.price}
                  </span>
                  <span className="text-xs text-[#1E2320]/50 font-normal">
                    Tax included · Free shipping on ₹499+
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#1E2320] mb-5">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(soap.rating)
                            ? 'fill-[#D97706] text-[#D97706]'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono font-medium">{soap.rating.toFixed(1)}</span>
                  <span className="text-[#1E2320]/50">({soap.reviewsCount} verified reviews)</span>
                </div>

                {/* Sub-Tabs: Overview vs Ingredients vs Reviews */}
                <div className="flex items-center gap-2 border-b border-[#E8E3DC] pb-2 mb-4 text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-1 transition-colors cursor-pointer ${
                      activeTab === 'details'
                        ? 'border-b-2 border-[#2E3E32] text-[#1E2320]'
                        : 'text-[#1E2320]/50 hover:text-[#1E2320]'
                    }`}
                  >
                    Profile & Scent
                  </button>
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-1 transition-colors cursor-pointer ${
                      activeTab === 'ingredients'
                        ? 'border-b-2 border-[#2E3E32] text-[#1E2320]'
                        : 'text-[#1E2320]/50 hover:text-[#1E2320]'
                    }`}
                  >
                    Full Ingredients
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-1 transition-colors cursor-pointer ${
                      activeTab === 'reviews'
                        ? 'border-b-2 border-[#2E3E32] text-[#1E2320]'
                        : 'text-[#1E2320]/50 hover:text-[#1E2320]'
                    }`}
                  >
                    Reviews ({soap.reviews.length})
                  </button>
                </div>

                {/* Tab 1: Details */}
                {activeTab === 'details' && (
                  <div className="space-y-4">
                    <p className="text-xs text-[#1E2320]/80 leading-relaxed font-light">
                      {soap.description}
                    </p>

                    {/* Scent Architecture Pyramid */}
                    <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E8E3DC] space-y-2 text-xs">
                      <div className="font-semibold text-[#1E2320] text-[11px] uppercase tracking-wider text-[#536B59]">
                        Scent Note Architecture
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#F4EFEB]">
                        <div>
                          <div className="text-[10px] uppercase text-[#1E2320]/50 font-mono">Top</div>
                          <div className="font-medium text-[#1E2320] text-[11px] mt-0.5">{soap.topNote}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase text-[#1E2320]/50 font-mono">Heart</div>
                          <div className="font-medium text-[#1E2320] text-[11px] mt-0.5">{soap.heartNote}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase text-[#1E2320]/50 font-mono">Base</div>
                          <div className="font-medium text-[#1E2320] text-[11px] mt-0.5">{soap.baseNote}</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-[#1E2320]/70 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#536B59] shrink-0" />
                      <span><strong>Bar Care Tip:</strong> Keep bar on a slotted dish between uses; lasts 40+ showers.</span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Ingredients */}
                {activeTab === 'ingredients' && (
                  <div className="space-y-3">
                    <p className="text-xs text-[#1E2320]/70 font-light">
                      100% full ingredient disclosure. No trade-secret fragrance chemicals.
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#1E2320] bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E8E3DC]">
                      {soap.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#536B59] font-bold">·</span>
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tab 3: Reviews */}
                {activeTab === 'reviews' && (
                  <div className="space-y-3">
                    {soap.reviews.map((rev, i) => (
                      <div key={i} className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E8E3DC]">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-medium text-[#1E2320]">{rev.author} · {rev.location}</span>
                          <span className="text-[#1E2320]/50 text-[11px] font-mono">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-1.5">
                          {[...Array(rev.rating)].map((_, rIdx) => (
                            <Star key={rIdx} className="w-3 h-3 fill-[#D97706] text-[#D97706]" />
                          ))}
                        </div>
                        <p className="text-xs text-[#1E2320]/80 leading-relaxed font-light">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Purchase Action Box */}
              <div className="mt-6 pt-5 border-t border-[#E8E3DC] flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#E8E3DC] bg-[#FFFFFF] rounded-md overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-2.5 text-[#1E2320] hover:bg-[#F4EFEB] disabled:opacity-40 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono text-xs font-semibold tabular-nums text-[#1E2320]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2.5 text-[#1E2320] hover:bg-[#F4EFEB] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add to Bag CTA */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-6 bg-[#2E3E32] text-[#FAF8F5] rounded-md text-xs font-semibold tracking-wide hover:bg-[#1E2320] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Bag</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">₹{soap.price * quantity}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
