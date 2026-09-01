import React from 'react';
import { useApp } from '../context/AppContext';
import { BowIcon, FloralMotif, DelicateDivider } from './DecorativeElements';
import { Sparkles, HeartHandshake, PackageCheck, Flame } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { navigateTo } = useApp();

  const pillars = [
    {
      title: 'Curated Ingredients',
      desc: 'We source only fresh produce, premium cuts, and farm-fresh dairy to create rich, memorable flavors.',
      icon: <Sparkles className="w-5 h-5 text-[#E3BEB8]" />,
    },
    {
      title: 'Freshly Prepared',
      desc: 'Every meal is made fresh to order. We never serve pre-packaged or mass-reheated dishes.',
      icon: <Flame className="w-5 h-5 text-[#E3BEB8]" />,
    },
    {
      title: 'Thoughtful Packaging',
      desc: 'Food arrives warm, securely boxed in elegant containers, preserving texture and presentation.',
      icon: <PackageCheck className="w-5 h-5 text-[#E3BEB8]" />,
    },
    {
      title: 'Warm Concierge Service',
      desc: 'Direct communication to ensure your timing, spice level, and dietary preferences are honored.',
      icon: <HeartHandshake className="w-5 h-5 text-[#E3BEB8]" />,
    },
  ];

  return (
    <section id="about-section" className="w-full bg-[#1A1814] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#4E4541]/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Editorial Image with Scalloped / Framed Motif */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-[#9A8E89]/40 p-3 bg-[#15130F] shadow-2xl">
              <div className="overflow-hidden h-[420px] sm:h-[480px]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7H-j361G4E7Y66eP3w0g52rZpQnO-43jT9Yy8b_uDqVq9eQp5hG88"
                  alt="Maison de Santé artisanal kitchen styling with fresh garlic bread and pasta"
                  onError={(e) => {
                    // Fallback to primary culinary hero
                    e.currentTarget.src =
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuCf8Op52VllugBUhoJIjojymT2eMyhGUTGv85-gvQvzEnZKP9korFTZg5Z7D6ODanACbWCsc7S1NMby9-A3hndqtd82tlRRSI8wiar8G8QfjWzCLrSY-Za1qbEhUz9jgG_mrR2p4l2BuwNkgZ7SGj2jIkEvhVe80xV3zRb9e5DTB8QJwMUJ_QmHXeV2SFffv5e5TU4udmEvQJoecIUAR7BjR--k9ayXcOb51HPIYXcwnepRubj6HSsh';
                  }}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#382D28] border border-[#E3BEB8]/40 px-4 py-3 shadow-xl hidden sm:block">
                <span className="font-serif-luxury text-sm text-[#FAF4EC] block">Est. 2024</span>
                <span className="text-[9px] font-sans-clean text-[#D1ADA7] uppercase tracking-widest">
                  Artisanal Kitchen
                </span>
              </div>
            </div>
          </div>

          {/* Story Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <BowIcon size={14} className="text-[#E3BEB8]" />
              <span className="font-sans-clean text-xs font-semibold uppercase tracking-[0.25em] text-[#E3BEB8]">
                OUR STORY & MISSION
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#FAF4EC] uppercase tracking-tight leading-tight">
              A LITTLE TASTE OF HOME, REFINED.
            </h2>

            <DelicateDivider icon="flower" className="max-w-[200px] !mx-0" />

            <div className="space-y-4 font-sans-clean text-sm sm:text-base text-[#D1C4BE] font-light leading-relaxed">
              <p>
                Maison de Santé was born from a simple belief: dining at home should never feel ordinary. We combine the soul-nourishing warmth of home-style culinary recipes with the elevated finesse and visual poetry of a boutique bistro.
              </p>
              <p>
                From our simmered signature jollof to velvety garlic cream chicken pasta and sweet strawberry treats, every dish is prepared in small batches with genuine care, authentic spices, and lovely presentation.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigateTo('menu')}
                className="px-8 py-3.5 bg-[#FAF4EC] text-[#382D28] hover:bg-[#E3BEB8] font-sans-clean text-xs font-semibold uppercase tracking-[0.2em] transition-colors shadow-lg"
              >
                DISCOVER OUR DISHES
              </button>
            </div>
          </div>

        </div>

        {/* Pillars / Why Choose Maison */}
        <div className="pt-12 border-t border-[#4E4541]/40">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF4EC] uppercase tracking-wide">
              WHY MAISON DE SANTÉ
            </h3>
            <p className="font-sans-clean text-xs sm:text-sm text-[#D1ADA7] font-light mt-1">
              The thoughtful standards behind every meal we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="p-6 bg-[#15130F] border border-[#4E4541]/60 hover:border-[#9A8E89] transition-colors flex flex-col justify-between"
              >
                <div className="w-10 h-10 border border-[#9A8E89]/40 flex items-center justify-center mb-4 bg-[#1D1B17]">
                  {p.icon}
                </div>
                <div>
                  <h4 className="font-serif-luxury text-base text-[#FAF4EC] uppercase mb-2">
                    {p.title}
                  </h4>
                  <p className="font-sans-clean text-xs text-[#D1C4BE] font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export const HowItWorks: React.FC = () => {
  const { navigateTo } = useApp();

  const steps = [
    {
      num: '01',
      title: 'BROWSE THE MENU',
      desc: 'Explore our curated menu of wholesome breakfasts, savory mains, artisan sides, and decadent desserts.',
    },
    {
      num: '02',
      title: 'CUSTOMIZE YOUR DISHES',
      desc: 'Pick proteins, extras, spice preferences, or leave specific culinary notes for our chefs.',
    },
    {
      num: '03',
      title: 'SUBMIT ORDER REQUEST',
      desc: 'Provide delivery details and send your request without upfront card details.',
    },
    {
      num: '04',
      title: 'CONFIRM & ENJOY',
      desc: 'Our concierge contacts you directly to confirm preparation and payment arrangements before delivery.',
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-[#15130F] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#4E4541]/40">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans-clean text-xs font-semibold uppercase tracking-[0.25em] text-[#E3BEB8] flex items-center justify-center gap-2">
            <BowIcon size={14} /> SIMPLE & SEAMLESS <BowIcon size={14} />
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#FAF4EC] uppercase tracking-tight mt-2 mb-3">
            HOW IT WORKS
          </h2>
          <DelicateDivider icon="bow" className="max-w-[180px] my-3" />
          <p className="font-sans-clean text-sm text-[#D1C4BE] font-light">
            A transparent, boutique ordering process tailored around your schedule and comfort.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="p-6 bg-[#1A1814] border border-[#4E4541]/60 flex flex-col justify-between relative group hover:border-[#9A8E89] transition-all"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif-luxury text-3xl text-[#E3BEB8] font-light">
                  {step.num}
                </span>
                <BowIcon size={16} className="text-[#9A8E89]/40 group-hover:text-[#E3BEB8] transition-colors" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-base text-[#FAF4EC] uppercase mb-2">
                  {step.title}
                </h3>
                <p className="font-sans-clean text-xs text-[#D1C4BE] font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('menu')}
            className="px-8 py-3.5 bg-[#FAF4EC] text-[#382D28] hover:bg-[#E3BEB8] font-sans-clean text-xs font-semibold uppercase tracking-[0.2em] transition-colors shadow-lg"
          >
            START YOUR ORDER NOW
          </button>
        </div>

      </div>
    </section>
  );
};
