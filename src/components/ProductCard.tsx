import React from 'react';
import { Plus, Check, Star } from 'lucide-react';
import { SoapProduct } from '../types';

interface ProductCardProps {
  soap: SoapProduct;
  onSelect: (soap: SoapProduct) => void;
  onAddToCart: (soap: SoapProduct, e: React.MouseEvent) => void;
  isAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  soap,
  onSelect,
  onAddToCart,
  isAdded,
}) => {
  return (
    <article
      onClick={() => onSelect(soap)}
      className="group relative flex flex-col bg-[#FFFFFF] rounded-xl border border-[#E8E3DC] overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-out"
    >
      {/* Product Image Stage (takes 65-70% visual focus) */}
      <div className="relative aspect-[4/3] w-full bg-[#F4EFEB] overflow-hidden">
        <img
          src={soap.image}
          alt={soap.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Quick Add Floating Button on Image */}
        <button
          onClick={(e) => onAddToCart(soap, e)}
          aria-label={`Add ${soap.name} to bag`}
          className="absolute bottom-3 right-3 p-2.5 bg-[#FAF8F5]/95 hover:bg-[#2E3E32] text-[#1E2320] hover:text-[#FAF8F5] rounded-lg shadow-sm border border-[#E8E3DC] transition-colors cursor-pointer group/btn"
        >
          {isAdded ? (
            <Check className="w-4 h-4 text-emerald-600 group-hover/btn:text-[#FAF8F5]" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </button>

        {/* Subtle non-pill metadata marker */}
        <div className="absolute top-3 left-3 text-[11px] font-medium tracking-wide uppercase text-[#1E2320]/80 bg-[#FAF8F5]/90 backdrop-blur-xs px-2 py-0.5 rounded border border-[#E8E3DC]/80">
          {soap.curingTime}
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Scent Notes with Typographic Separator */}
          <div className="flex items-center gap-1.5 text-xs text-[#536B59] font-medium mb-1.5 truncate">
            <span>{soap.scentNotes[0]}</span>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span className="truncate">{soap.scentNotes[1]}</span>
          </div>

          <h3 className="font-serif text-lg font-medium text-[#1E2320] group-hover:text-[#2E3E32] transition-colors leading-snug">
            {soap.name}
          </h3>

          <p className="text-xs text-[#1E2320]/70 line-clamp-2 mt-1 leading-relaxed">
            {soap.subtitle}
          </p>
        </div>

        {/* Price & Specs Baseline */}
        <div className="mt-4 pt-3 border-t border-[#F4EFEB] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-[#1E2320] font-mono tabular-nums">
              ₹{soap.price}
            </span>
            <span className="text-xs text-[#1E2320]/60 font-normal">
              / {soap.weight}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-[#1E2320]/80 font-medium">
            <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
            <span className="font-mono tabular-nums">{soap.rating.toFixed(1)}</span>
            <span className="text-[#1E2320]/50 text-[11px]">({soap.reviewsCount})</span>
          </div>
        </div>
      </div>
    </article>
  );
};
