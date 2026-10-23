import React from 'react';
import { Droplets, Sparkles, Clock, Leaf } from 'lucide-react';

export const CraftStory: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Low-Temperature Saponification',
      desc: 'We never heat plant oils above 105°F. Keeping temperatures low preserves unrefined polyphenols in extra virgin olive oil and unrefined African shea butter.',
      icon: Droplets,
    },
    {
      num: '02',
      title: 'Whole Botanical Infusions',
      desc: 'Dried calendula blossoms, crushed spearmint, and French montmorillonite clays are folded in right at the trace stage for authentic natural color and gentle dermal buffing.',
      icon: Leaf,
    },
    {
      num: '03',
      title: '6-Week Air Curing on Cedar Racks',
      desc: 'While commercial soaps use chemical hardeners to ship in 24 hours, our bars slowly cure on open racks. Natural moisture evaporates slowly, yielding a dense, long-lasting bar.',
      icon: Clock,
    },
    {
      num: '04',
      title: 'Hand-Cut & Zero-Plastic Packaging',
      desc: 'Each 140g block is individually wire-beveled and wrapped in recycled FSC-certified seed paper with vegetable soy ink. Zero plastic shrink wrap in our entire facility.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="craft" className="py-16 bg-[#FAF8F5] border-t border-[#E8E3DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#536B59] mb-2">
            The Traditional Method
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E2320] font-normal tracking-tight">
            Why Cold-Process Soap Transforms Your Skin
          </h2>
          <p className="text-sm text-[#1E2320]/75 mt-3 leading-relaxed font-light">
            Modern commercial body wash and detergent bars strip your epidermal lipid mantle with petroleum-derived sulfates. soapy returns to ancient saponification: plant lipids converted into natural organic glycerin that retains moisture in your skin for hours after bathing.
          </p>
        </div>

        {/* 4-Step Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E8E3DC] flex flex-col justify-between hover:border-[#536B59]/50 transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-semibold text-[#536B59]">
                      {step.num}
                    </span>
                    <Icon className="w-4 h-4 text-[#536B59]" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#1E2320] mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#1E2320]/75 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F4EFEB] text-[11px] font-mono text-[#1E2320]/50 uppercase">
                  Batch Verified
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
