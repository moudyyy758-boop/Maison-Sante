import React from 'react';
import { useApp } from '../context/AppContext';
import { BowIcon, DelicateDivider } from './DecorativeElements';
import { Heart, Instagram, Phone, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#100E0A] text-[#FAF4EC] pt-16 pb-12 border-t border-[#4E4541]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top brand & monogram row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#4E4541]/40">
          
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 border border-[#9A8E89]/40 flex items-center justify-center font-serif-luxury text-2xl text-[#FAF4EC]">
              MS
            </div>
            <div>
              <h3 className="font-serif-luxury text-2xl tracking-[0.08em] text-[#FAF4EC] uppercase">
                Maison de Santé
              </h3>
              <p className="text-[11px] font-sans-clean text-[#D1ADA7] tracking-[0.25em] uppercase mt-0.5">
                Good Food, Beautifully Made.
              </p>
            </div>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap justify-center gap-6 sm:gap-8 font-sans-clean text-xs uppercase tracking-[0.18em] text-[#D1C4BE]">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-[#FAF4EC] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('menu')}
              className="hover:text-[#FAF4EC] transition-colors"
            >
              Menu
            </button>
            <button
              onClick={() => navigateTo('order-history')}
              className="hover:text-[#FAF4EC] transition-colors"
            >
              Order History
            </button>
            <button
              onClick={() => navigateTo('home', 'about-section')}
              className="hover:text-[#FAF4EC] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => navigateTo('home', 'how-it-works')}
              className="hover:text-[#FAF4EC] transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => navigateTo('home', 'faq-section')}
              className="hover:text-[#FAF4EC] transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => navigateTo('home', 'contact-section')}
              className="hover:text-[#FAF4EC] transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 border border-[#4E4541] hover:border-[#FAF4EC] flex items-center justify-center text-[#D1C4BE] hover:text-[#FAF4EC] transition-colors"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Middle Notice */}
        <div className="py-8 text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <BowIcon size={14} className="text-[#E3BEB8]" />
            <span className="text-[10px] font-sans-clean uppercase tracking-[0.25em] text-[#D1ADA7]">
              Boutique Culinary Notice
            </span>
            <BowIcon size={14} className="text-[#E3BEB8]" />
          </div>
          <p className="text-xs font-sans-clean text-[#9A8E89] font-light leading-relaxed">
            Maison de Santé operates as an artisanal food delivery kitchen. Online card payment is not processed on this site; all orders are received as requests, and payment is arranged directly with our concierge team.
          </p>
        </div>

        {/* Bottom copyright & credits */}
        <div className="pt-8 border-t border-[#4E4541]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans-clean text-[#9A8E89]">
          <p>
            © {new Date().getFullYear()} Maison de Santé. All culinary rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[#D1ADA7]">
            <span className="flex items-center gap-1.5 text-[11px]">
              Crafted with <Heart className="w-3 h-3 text-[#E3BEB8] fill-[#E3BEB8]" /> for good food lovers
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
