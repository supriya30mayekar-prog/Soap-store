import React, { useState } from 'react';
import { Check, Sparkles, Plus, X, ShoppingBag } from 'lucide-react';
import { SoapProduct } from '../types';

interface TrioBuilderProps {
  products: SoapProduct[];
  onAddTrioToCart: (selectedBars: SoapProduct[]) => void;
}

export const TrioBuilder: React.FC<TrioBuilderProps> = ({
  products,
  onAddTrioToCart,
}) => {
  // Store up to 3 selected soap IDs
  const [selectedIds, setSelectedIds] = useState<string[]>([
    products[0]?.id || '',
    products[1]?.id || '',
    products[3]?.id || '',
  ]);
  const [justAdded, setJustAdded] = useState(false);

  const handleSelectBar = (index: number, id: string) => {
    const updated = [...selectedIds];
    updated[index] = id;
    setSelectedIds(updated);
  };

  const handleRemoveSlot = (index: number) => {
    const updated = [...selectedIds];
    updated[index] = '';
    setSelectedIds(updated);
  };

  const isComplete = selectedIds.length === 3 && selectedIds.every((id) => id !== '');

  const selectedProducts = selectedIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as SoapProduct[];

  const regularTotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const bundlePrice = 799;
  const savings = regularTotal > bundlePrice ? regularTotal - bundlePrice : 98;

  const handleAddToCart = () => {
    if (!isComplete) return;
    onAddTrioToCart(selectedProducts);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <section id="trio-builder" className="py-16 bg-[#F4EFEB] border-y border-[#E8E3DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#536B59] mb-2">
            Bundle & Preserve
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E2320] font-normal tracking-tight">
            Build Your Botanical Trio
          </h2>
          <p className="text-sm text-[#1E2320]/75 mt-2 font-light">
            Select any 3 full-size bars for ₹799 (Save up to ₹{savings.toFixed(0)}). Every custom trio automatically includes our hand-slatted draining wooden soap dish.
          </p>
        </div>

        {/* 3 Interactive Slots Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          {[0, 1, 2].map((slotIndex) => {
            const currentId = selectedIds[slotIndex];
            const currentProduct = products.find((p) => p.id === currentId);

            return (
              <div
                key={slotIndex}
                className={`relative rounded-xl border p-4 flex flex-col justify-between min-h-[220px] transition-all ${
                  currentProduct
                    ? 'bg-[#FFFFFF] border-[#E8E3DC] shadow-xs'
                    : 'bg-[#FAF8F5]/60 border-dashed border-[#536B59]/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-[#1E2320]/60 mb-2">
                  <span className="font-mono uppercase tracking-wider text-[11px]">
                    Bar 0{slotIndex + 1}
                  </span>
                  {currentProduct && (
                    <button
                      onClick={() => handleRemoveSlot(slotIndex)}
                      className="text-[#1E2320]/40 hover:text-red-600 transition-colors cursor-pointer"
                      title="Clear slot"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {currentProduct ? (
                  <div className="flex items-center gap-4 my-auto">
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="w-20 h-20 rounded-lg object-cover bg-[#FAF8F5] border border-[#E8E3DC] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <div className="text-xs text-[#536B59] font-medium truncate">
                        {currentProduct.scentNotes[0]}
                      </div>
                      <div className="font-serif text-sm font-medium text-[#1E2320] truncate">
                        {currentProduct.name}
                      </div>
                      <div className="text-xs text-[#1E2320]/60 mt-0.5">
                        {currentProduct.weight}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="my-auto text-center py-6 text-xs text-[#1E2320]/60">
                    <p className="font-medium text-[#1E2320]">Slot Empty</p>
                    <p className="mt-1">Tap a bar below to add</p>
                  </div>
                )}

                {/* Quick selector options for this specific slot */}
                <div className="pt-3 border-t border-[#F4EFEB] mt-2">
                  <select
                    value={currentId || ''}
                    onChange={(e) => handleSelectBar(slotIndex, e.target.value)}
                    className="w-full text-xs bg-[#FAF8F5] border border-[#E8E3DC] rounded px-2 py-1 text-[#1E2320] cursor-pointer focus:outline-hidden focus:border-[#536B59]"
                  >
                    <option value="" disabled>Choose soap...</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (₹{p.price})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Gift & Price Summary Banner */}
        <div className="max-w-2xl mx-auto bg-[#FFFFFF] rounded-xl border border-[#E8E3DC] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-lg bg-[#F4EFEB] border border-[#E8E3DC] flex items-center justify-center shrink-0 text-[#536B59]">
              <Sparkles className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-medium text-[#1E2320]">
                  Custom 3-Bar Trio
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Save ₹{savings.toFixed(0)}
                </span>
              </div>
              <div className="text-xs text-[#1E2320]/75 mt-0.5">
                Includes complimentary Natural Wooden Draining Dish (₹199 value)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right">
              <div className="text-lg font-bold font-mono text-[#1E2320] tabular-nums">
                ₹{bundlePrice}
              </div>
              <div className="text-[11px] text-[#1E2320]/50 line-through font-mono tabular-nums">
                ₹{regularTotal + 199}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!isComplete}
              className={`px-5 py-3 rounded-md text-xs font-semibold tracking-wide flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isComplete
                  ? 'bg-[#2E3E32] text-[#FAF8F5] hover:bg-[#1E2320] shadow-sm'
                  : 'bg-[#E8E3DC] text-[#1E2320]/40 cursor-not-allowed'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Added Trio!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Trio to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
