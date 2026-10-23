import React, { useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigate,
  onOpenQuiz,
}) => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E3DC]">
      {showBanner && (
        <div className="bg-[#2E3E32] text-[#FAF8F5] px-4 py-2 text-xs font-normal tracking-wide flex items-center justify-between transition-all">
          <div className="mx-auto flex items-center gap-2 text-center truncate">
            <span>Fresh Autumn Batch Ready</span>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span>Free Shipping on orders over ₹499</span>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span className="hidden sm:inline">Use code <strong className="font-semibold underline decoration-[#FAF8F5]/40 underline-offset-2">SOAPY10</strong> for 10% off</span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss banner"
            className="text-[#FAF8F5]/70 hover:text-[#FAF8F5] p-0.5 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 single-line links) — Zone 3 (Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          className="group flex items-baseline gap-1 text-left whitespace-nowrap shrink-0 text-inherit cursor-pointer"
        >
          <span className="font-serif text-3xl font-light tracking-tight text-[#1E2320] group-hover:text-[#2E3E32] transition-colors">
            soapy
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#536B59] inline-block mb-1" />
        </button>

        {/* Zone 2: 4 single-line links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1E2320]/75">
          <button
            onClick={() => onNavigate('products')}
            className="hover:text-[#1E2320] transition-colors hover:underline underline-offset-8 decoration-[#536B59]/40 whitespace-nowrap shrink-0 cursor-pointer"
          >
            All Bars
          </button>
          <button
            onClick={() => onNavigate('trio-builder')}
            className="hover:text-[#1E2320] transition-colors hover:underline underline-offset-8 decoration-[#536B59]/40 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Build Trio (Save 15%)
          </button>
          <button
            onClick={onOpenQuiz}
            className="hover:text-[#1E2320] transition-colors hover:underline underline-offset-8 decoration-[#536B59]/40 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Scent Quiz
          </button>
          <button
            onClick={() => onNavigate('craft')}
            className="hover:text-[#1E2320] transition-colors hover:underline underline-offset-8 decoration-[#536B59]/40 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Our Craft
          </button>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label="Open Shopping Bag"
            className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold tracking-wide text-[#FAF8F5] bg-[#2E3E32] rounded-md hover:bg-[#1E2320] transition-all cursor-pointer shadow-xs active:scale-98 whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
            <span>Bag</span>
            <span className="font-mono tabular-nums bg-[#FAF8F5]/20 text-[#FAF8F5] px-1.5 py-0.5 rounded text-[11px] font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
