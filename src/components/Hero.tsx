import React from 'react';
import { ArrowRight, Sparkles, Clock, Droplets, Leaf, ShieldCheck } from 'lucide-react';
import { HERO_IMAGE } from '../data/soaps';

interface HeroProps {
  onShopClick: () => void;
  onQuizClick: () => void;
  onTrioClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopClick,
  onQuizClick,
  onTrioClick,
}) => {
  return (
    <section id="hero" className="relative pt-6 pb-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Split: Editorial Left & Studio Visual Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Typography, Narrative & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#536B59] mb-4">
              Cold-Processed Botanical Bath Bars
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] font-normal text-[#1E2320] tracking-tight mb-6 [text-wrap:balance]">
              Pure plant oils. Earth clays. Slow cured by nature.
            </h1>

            <p className="text-base sm:text-lg text-[#1E2320]/80 leading-relaxed max-w-xl mb-8 font-light">
              Crafted in micro-batches with cold-pressed Mediterranean olive oil, raw unrefined shea butter, and steam-distilled essential oils. Each bar is naturally air-cured for six weeks to preserve organic glycerin and botanical actives.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onShopClick}
                className="px-6 py-3.5 bg-[#2E3E32] text-[#FAF8F5] rounded-md text-sm font-semibold tracking-wide hover:bg-[#1E2320] transition-all cursor-pointer shadow-sm flex items-center gap-2 group whitespace-nowrap"
              >
                <span>Shop the Bars</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onQuizClick}
                className="px-6 py-3.5 bg-transparent border border-[#536B59]/40 text-[#1E2320] rounded-md text-sm font-medium hover:bg-[#FAF8F5] hover:border-[#1E2320] transition-all cursor-pointer whitespace-nowrap"
              >
                Find Your Scent
              </button>
            </div>

            {/* Micro assurance line */}
            <div className="mt-8 pt-6 border-t border-[#E8E3DC] flex items-center gap-4 text-xs text-[#1E2320]/70 font-normal">
              <span>Zero Palm Oil</span>
              <span aria-hidden="true" className="text-[#536B59]">·</span>
              <span>Synthetic Fragrance-Free</span>
              <span aria-hidden="true" className="text-[#536B59]">·</span>
              <span>100% Biodegradable</span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Studio Product Imagery */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden bg-[#F4EFEB] border border-[#E8E3DC] shadow-xs group">
              <img
                src={HERO_IMAGE}
                alt="Artisan handmade cold-processed bar soaps arranged on a warm travertine stone slab with dried lavender and eucalyptus"
                className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />

              {/* Floating aesthetic feature card */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xs bg-[#FAF8F5]/95 backdrop-blur-md p-4 rounded-xl border border-[#E8E3DC] shadow-sm">
                <div className="flex items-center justify-between text-xs text-[#536B59] font-medium mb-1">
                  <span>Batch No. 2026-B10</span>
                  <span className="font-mono text-[11px] text-[#1E2320]/60">Air-Cured</span>
                </div>
                <div className="font-serif text-sm font-medium text-[#1E2320]">
                  The Signature Autumn Trio
                </div>
                <div className="text-xs text-[#1E2320]/75 mt-0.5 mb-2">
                  Spearmint, Oatmeal Lavender, and Calendula Blossom.
                </div>
                <button
                  onClick={onTrioClick}
                  className="text-xs font-semibold text-[#2E3E32] hover:text-[#1E2320] underline underline-offset-4 decoration-[#536B59] cursor-pointer"
                >
                  Build bundle for ₹799 &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Strip: Full-Width 4-Column Grid Below Hero */}
        <div className="mt-14 pt-8 border-t border-[#E8E3DC] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E8E3DC] flex items-center justify-center shrink-0 text-[#2E3E32]">
              <Clock className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1E2320]">6-Week Slow Cure</div>
              <div className="text-xs text-[#1E2320]/70 mt-0.5 leading-relaxed">
                Retains natural glycerin for a bar that never turns to mush.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E8E3DC] flex items-center justify-center shrink-0 text-[#2E3E32]">
              <Droplets className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1E2320]">Plant Botanical Oils</div>
              <div className="text-xs text-[#1E2320]/70 mt-0.5 leading-relaxed">
                Cold-pressed olive, coconut, and pure vegetable glycerin.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E8E3DC] flex items-center justify-center shrink-0 text-[#2E3E32]">
              <Leaf className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1E2320]">Zero Synthetic Fillers</div>
              <div className="text-xs text-[#1E2320]/70 mt-0.5 leading-relaxed">
                No SLS, phthalates, artificial perfumes, or palm oil ever.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E8E3DC] flex items-center justify-center shrink-0 text-[#2E3E32]">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1E2320]">Free Shipping ₹499+</div>
              <div className="text-xs text-[#1E2320]/70 mt-0.5 leading-relaxed">
                Plastic-free recycled paper packaging across all pin codes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
