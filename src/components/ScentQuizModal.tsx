import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, Check, RotateCcw } from 'lucide-react';
import { SoapProduct } from '../types';

interface ScentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: SoapProduct[];
  onAddToCart: (product: SoapProduct) => void;
}

export const ScentQuizModal: React.FC<ScentQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
}) => {
  const [step, setStep] = useState<number>(1);
  const [skinType, setSkinType] = useState<string>('');
  const [vibe, setVibe] = useState<string>('');
  const [texture, setTexture] = useState<string>('');
  const [added, setAdded] = useState(false);

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setSkinType('');
    setVibe('');
    setTexture('');
    setAdded(false);
  };

  // Determine recommended bar based on user answers
  const getRecommendation = (): SoapProduct => {
    if (skinType === 'oily' || texture === 'scrub') {
      return products.find((p) => p.id === 'charcoal-tea-tree') || products[0];
    }
    if (skinType === 'sensitive' || vibe === 'calming') {
      return products.find((p) => p.id === 'lavender-oat') || products[1];
    }
    if (vibe === 'citrus' || skinType === 'dull') {
      return products.find((p) => p.id === 'citrus-calendula') || products[3];
    }
    return products.find((p) => p.id === 'eucalyptus-mint') || products[0];
  };

  const matchedProduct = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E2320]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-2xl border border-[#E8E3DC] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E3DC] flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#536B59]" />
            <span className="font-serif text-lg font-medium text-[#1E2320]">
              Botanical Scent & Skin Finder
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#1E2320]/50 hover:text-[#1E2320] p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {step === 1 && (
            <div>
              <div className="text-xs font-mono text-[#536B59] uppercase tracking-wider mb-2">
                Question 01 of 03
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1E2320] mb-2 font-normal">
                How does your skin feel during the day?
              </h3>
              <p className="text-xs text-[#1E2320]/70 mb-6 font-light">
                We balance superfat percentages and cold-pressed botanical oils to match your dermal moisture barrier.
              </p>

              <div className="space-y-2.5">
                {[
                  { id: 'sensitive', title: 'Dry, Reactive or Easily Tight', desc: 'Needs rich cocoa butter and soothing colloidal oat milk' },
                  { id: 'oily', title: 'Oily, Congested or Sweat-Prone', desc: 'Prefers hardwood charcoal, sea salts, and pore clarifying botanicals' },
                  { id: 'dull', title: 'Normal to Dull, Craves Radiance', desc: 'Enjoys vitamin-rich calendula oil and uplifting citrus essences' },
                  { id: 'active', title: 'Active, In Need of Clean Awakening', desc: 'Loves cooling spearmint vapor and mineral-rich French green clay' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSkinType(option.id);
                      setStep(2);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      skinType === option.id
                        ? 'border-[#2E3E32] bg-[#FFFFFF] shadow-xs'
                        : 'border-[#E8E3DC] bg-[#FFFFFF] hover:border-[#536B59] hover:bg-[#F4EFEB]/50'
                    }`}
                  >
                    <div className="text-sm font-semibold text-[#1E2320]">{option.title}</div>
                    <div className="text-xs text-[#1E2320]/65 mt-0.5">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="text-xs font-mono text-[#536B59] uppercase tracking-wider mb-2">
                Question 02 of 03
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1E2320] mb-2 font-normal">
                What aroma profile elevates your mood?
              </h3>
              <p className="text-xs text-[#1E2320]/70 mb-6 font-light">
                We strictly use 100% pure steam-distilled essential oils, never petrochemical fragrances.
              </p>

              <div className="space-y-2.5">
                {[
                  { id: 'herbal', title: 'Alpine Herbs & Chilled Mint', desc: 'Crisp eucalyptus leaves, spearmint, and mountain air' },
                  { id: 'calming', title: 'Lavender & Creamy Oat Warmth', desc: 'Soft French lavender blossoms and warm soothing resins' },
                  { id: 'citrus', title: 'Sunlit Orchard & Orange Blossom', desc: 'Zesty cold-pressed citrus peel with golden marigold' },
                  { id: 'earthy', title: 'Tea Tree & Earthy Birch Smoke', desc: 'Clean Australian tea tree and grounding dark minerals' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setVibe(option.id);
                      setStep(3);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      vibe === option.id
                        ? 'border-[#2E3E32] bg-[#FFFFFF] shadow-xs'
                        : 'border-[#E8E3DC] bg-[#FFFFFF] hover:border-[#536B59] hover:bg-[#F4EFEB]/50'
                    }`}
                  >
                    <div className="text-sm font-semibold text-[#1E2320]">{option.title}</div>
                    <div className="text-xs text-[#1E2320]/65 mt-0.5">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="text-xs font-mono text-[#536B59] uppercase tracking-wider mb-2">
                Question 03 of 03
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1E2320] mb-2 font-normal">
                What shower lather texture do you prefer?
              </h3>
              <p className="text-xs text-[#1E2320]/70 mb-6 font-light">
                Different plant oils yield silky lotion glides or lively billowy suds.
              </p>

              <div className="space-y-2.5">
                {[
                  { id: 'smooth', title: 'Velvet Lotion Glide (Zero grit)', desc: 'Smooth, cushiony cream lather that blankets dry skin' },
                  { id: 'botanical', title: 'Delicate Botanical Petal Touch', desc: 'Mild crushed leaves and whole flower petals for soft buffing' },
                  { id: 'scrub', title: 'Deep Mineral Scrub', desc: 'Pacific sea salt crystal dusting to slough stubborn flakes' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setTexture(option.id);
                      setStep(4);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      texture === option.id
                        ? 'border-[#2E3E32] bg-[#FFFFFF] shadow-xs'
                        : 'border-[#E8E3DC] bg-[#FFFFFF] hover:border-[#536B59] hover:bg-[#F4EFEB]/50'
                    }`}
                  >
                    <div className="text-sm font-semibold text-[#1E2320]">{option.title}</div>
                    <div className="text-xs text-[#1E2320]/65 mt-0.5">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="text-center mb-6">
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  98% Botanical Match
                </span>
                <h3 className="font-serif text-2xl text-[#1E2320] mt-3 font-normal">
                  Your Ideal Bar: {matchedProduct.name}
                </h3>
                <p className="text-xs text-[#1E2320]/75 mt-1 max-w-sm mx-auto font-light">
                  Tailored for your skin preference with authentic slow-cured botanicals.
                </p>
              </div>

              {/* Matched Product Card Preview */}
              <div className="bg-[#FFFFFF] border border-[#E8E3DC] rounded-xl p-4 flex gap-4 items-center mb-6 shadow-xs">
                <img
                  src={matchedProduct.image}
                  alt={matchedProduct.name}
                  className="w-24 h-24 rounded-lg object-cover bg-[#F4EFEB] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-[#536B59] font-medium truncate">
                    {matchedProduct.scentNotes.join(' · ')}
                  </div>
                  <div className="font-serif text-base font-semibold text-[#1E2320] truncate">
                    {matchedProduct.name}
                  </div>
                  <div className="text-xs text-[#1E2320]/70 line-clamp-2 mt-0.5">
                    {matchedProduct.description}
                  </div>
                  <div className="text-sm font-bold font-mono text-[#1E2320] mt-2 tabular-nums">
                    ₹{matchedProduct.price}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onAddToCart(matchedProduct);
                    setAdded(true);
                    setTimeout(() => {
                      onClose();
                      handleReset();
                    }, 1200);
                  }}
                  className="flex-1 py-3 px-4 bg-[#2E3E32] text-[#FAF8F5] rounded-md text-xs font-semibold tracking-wide hover:bg-[#1E2320] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <span>Add Recommended Bar to Bag</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="p-3 border border-[#E8E3DC] bg-[#FFFFFF] text-[#1E2320]/70 hover:text-[#1E2320] rounded-md transition-colors cursor-pointer"
                  title="Retake Quiz"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
