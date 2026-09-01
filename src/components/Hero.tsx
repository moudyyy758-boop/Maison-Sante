import React from 'react';
import { useApp } from '../context/AppContext';
import { BowIcon, FloralMotif, DelicateDivider } from './DecorativeElements';
import { Utensils, Heart, Truck } from 'lucide-react';

export const Hero: React.FC = () => {
  const { navigateTo, setIsCartOpen, totalCartCount } = useApp();

  return (
    <section className="relative w-full min-h-[640px] lg:min-h-[740px] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden bg-[#15130F]">
      {/* Background Image with Cinematic Tonal Gradients */}
      <div className="absolute inset-0 z-0 opacity-35">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCf8Op52VllugBUhoJIjojymT2eMyhGUTGv85-gvQvzEnZKP9korFTZg5Z7D6ODanACbWCsc7S1NMby9-A3hndqtd82tlRRSI8wiar8G8QfjWzCLrSY-Za1qbEhUz9jgG_mrR2p4l2BuwNkgZ7SGj2jIkEvhVe80xV3zRb9e5DTB8QJwMUJ_QmHXeV2SFffv5e5TU4udmEvQJoecIUAR7BjR--k9ayXcOb51HPIYXcwnepRubj6HSsh')`,
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#15130F]/90 via-[#15130F]/65 to-[#15130F]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Eyebrow badge with bow */}
        <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 border border-[#9A8E89]/40 bg-[#1D1B17]/70 backdrop-blur-sm">
          <BowIcon size={14} className="text-[#E3BEB8]" />
          <span className="font-sans-clean text-[11px] sm:text-xs font-semibold text-[#E3BEB8] uppercase tracking-[0.25em]">
            WELCOME TO MAISON DE SANTÉ
          </span>
          <BowIcon size={14} className="text-[#E3BEB8]" />
        </div>

        {/* Main Display Headline */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.95] text-[#FAF4EC] uppercase tracking-[-0.01em] my-3">
          GOOD FOOD,<br />BEAUTIFULLY MADE.
        </h1>

        {/* Delicate divider with flower */}
        <DelicateDivider icon="flower" className="my-4 max-w-xs" />

        {/* Supporting Brand Subtext */}
        <p className="font-sans-clean text-base sm:text-lg text-[#D1C4BE] max-w-2xl font-light leading-relaxed mb-8 px-4">
          “Thoughtfully prepared dishes made to bring a little more comfort and elegance to your day.”
        </p>

        {/* Hero Feature Badges (Mobile & Tablet) */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[#D1ADA7] font-sans-clean text-xs uppercase tracking-[0.18em] mb-10">
          <span className="flex items-center gap-2">
            <Utensils className="w-3.5 h-3.5 text-[#E3BEB8]" /> Freshly Prepared
          </span>
          <span className="hidden sm:inline text-[#9A8E89]/40">•</span>
          <span className="flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-[#E3BEB8]" /> Made with Care
          </span>
          <span className="hidden sm:inline text-[#9A8E89]/40">•</span>
          <span className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-[#E3BEB8]" /> Delivered to You
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4">
          <button
            onClick={() => navigateTo('menu')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF4EC] text-[#382D28] font-sans-clean text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#E3BEB8] hover:text-[#382D28] transition-all duration-300 active:scale-95 shadow-lg"
          >
            EXPLORE THE MENU
          </button>
          
          <button
            onClick={() => {
              if (totalCartCount > 0) {
                navigateTo('order');
              } else {
                navigateTo('menu');
              }
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-[#FAF4EC] border border-[#9A8E89]/60 font-sans-clean text-xs font-semibold uppercase tracking-[0.2em] hover:border-[#FAF4EC] hover:bg-[#FAF4EC]/10 transition-all duration-300"
          >
            START AN ORDER
          </button>
        </div>
      </div>
    </section>
  );
};

export const HeroFeatures: React.FC = () => {
  const features = [
    {
      title: 'FRESHLY PREPARED',
      desc: 'Freshly prepared dishes made with care and cooked to order daily.',
      icon: <Utensils className="w-5 h-5 text-[#E3BEB8]" />,
    },
    {
      title: 'MADE WITH CARE',
      desc: 'Thoughtfully selected ingredients sourced for quality and richness.',
      icon: <Heart className="w-5 h-5 text-[#E3BEB8]" />,
    },
    {
      title: 'DELIVERED TO YOU',
      desc: 'Simple ordering and convenient delivery right to your doorstep.',
      icon: <Truck className="w-5 h-5 text-[#E3BEB8]" />,
    },
  ];

  return (
    <section className="w-full bg-[#1D1B17] border-y border-[#4E4541]/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#4E4541]/40">
        {features.map((f, i) => (
          <div key={f.title} className={`flex flex-col items-center px-6 ${i > 0 ? 'pt-8 md:pt-0' : ''}`}>
            <div className="w-12 h-12 border border-[#9A8E89]/30 flex items-center justify-center mb-4 bg-[#15130F]">
              {f.icon}
            </div>
            <h3 className="font-serif-luxury text-base tracking-[0.15em] text-[#FAF4EC] uppercase mb-2">
              {f.title}
            </h3>
            <p className="font-sans-clean text-sm text-[#D1C4BE] font-light max-w-xs leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
