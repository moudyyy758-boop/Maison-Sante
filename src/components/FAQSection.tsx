import React, { useState } from 'react';
import { FAQS } from '../data/menuData';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { BowIcon, DelicateDivider } from './DecorativeElements';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="w-full bg-[#1A1814] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#4E4541]/40">
      <div className="max-w-4xl mx-auto">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-sans-clean text-xs font-semibold uppercase tracking-[0.25em] text-[#E3BEB8] flex items-center justify-center gap-2">
            <BowIcon size={14} /> FREQUENTLY ASKED QUESTIONS <BowIcon size={14} />
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#FAF4EC] uppercase tracking-tight mt-2 mb-3">
            QUESTIONS & ANSWERS
          </h2>
          <DelicateDivider icon="flower" className="max-w-[180px] my-3" />
          <p className="font-sans-clean text-sm text-[#D1C4BE] font-light">
            Everything you need to know about placing order requests with Maison de Santé.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="border border-[#4E4541]/60 bg-[#15130F] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif-luxury text-base sm:text-lg text-[#FAF4EC] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 border border-[#4E4541] flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#2C2A25] border-[#FAF4EC]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-[#FAF4EC]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#4E4541]/40 text-xs sm:text-sm font-sans-clean text-[#D1C4BE] font-light leading-relaxed animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
