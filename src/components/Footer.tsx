import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuiz }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1E2320] text-[#FAF8F5] pt-16 pb-12 border-t border-[#2E3E32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-[#FAF8F5]/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-3xl font-light tracking-tight text-[#FAF8F5] lowercase">
                soapy
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#536B59] inline-block mb-1" />
            </div>

            <p className="text-xs text-[#FAF8F5]/70 max-w-sm leading-relaxed font-light">
              Simple, pure, cold-processed soap bars formulated from cold-pressed culinary-grade olive oils, raw butters, and wild botanical extracts. Slow cured for six weeks in small seasonal batches.
            </p>

            <div className="pt-2 text-[11px] text-[#FAF8F5]/50 font-mono">
              Cruelty-Free · Zero Palm Oil · Zero Petrochemicals
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <div className="font-semibold uppercase tracking-wider text-[#FAF8F5]/50 font-mono text-[11px]">
              Store Navigation
            </div>
            <ul className="space-y-2 text-[#FAF8F5]/80">
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  All Soap Bars
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trio-builder')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Build Custom Trio Bundle
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuiz}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Botanical Scent Finder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('craft')}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  The Cold Cure Process
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Dispatch */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-semibold uppercase tracking-wider text-[#FAF8F5]/50 font-mono text-[11px]">
              Seasonal Batch Dispatch
            </div>
            <p className="text-xs text-[#FAF8F5]/70 font-light leading-relaxed">
              Sign up for private announcements when fresh seasonal cures are released from the drying racks.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#2E3E32] rounded-md text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>You're subscribed to the Autumn soap releases.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#2E3E32] border border-[#FAF8F5]/20 rounded-md text-xs text-[#FAF8F5] placeholder-[#FAF8F5]/40 focus:outline-hidden focus:border-[#536B59]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FAF8F5] text-[#1E2320] text-xs font-semibold rounded-md hover:bg-[#F4EFEB] transition-colors cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Unboxed Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F5]/50">
          <div>
            © {new Date().getFullYear()} soapy Co. Handcrafted Botanical Soaps. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#FAF8F5]/80 transition-colors cursor-pointer">
              Privacy Notice
            </span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-[#FAF8F5]/80 transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-[#FAF8F5]/80 transition-colors cursor-pointer">
              Ingredient Transparency
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
