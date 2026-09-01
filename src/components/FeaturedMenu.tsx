import React from 'react';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS } from '../data/menuData';
import { MenuItem } from '../types';
import { BowIcon, DelicateDivider } from './DecorativeElements';
import { Plus, Eye } from 'lucide-react';

export const FeaturedMenu: React.FC = () => {
  const { setSelectedProduct, addToCart, navigateTo } = useApp();

  // Featured sample items from prompt: Creamy Garlic Chicken Pasta, Classic Jollof & Grilled Chicken, Strawberry Cream Cup, Strawberry Lemonade
  const featuredIds = ['main-001', 'main-002', 'des-001', 'drk-001'];
  const featuredItems = MENU_ITEMS.filter((item) => featuredIds.includes(item.id));

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    // If item has required customizations, open detail modal instead
    const hasRequired = (item.customizationGroups || item.customizations)?.some((g) => g.required);
    if (hasRequired) {
      setSelectedProduct(item);
    } else {
      addToCart(item, 1, []);
    }
  };

  return (
    <section className="w-full bg-[#15130F] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#4E4541]/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans-clean text-xs font-semibold uppercase tracking-[0.25em] text-[#E3BEB8] flex items-center justify-center gap-2">
            <BowIcon size={14} /> SIGNATURE SELECTION <BowIcon size={14} />
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#FAF4EC] uppercase tracking-tight mt-2 mb-3">
            A LITTLE TASTE OF MAISON
          </h2>
          <DelicateDivider icon="flower" className="max-w-[180px] my-3" />
          <p className="font-sans-clean text-sm text-[#D1C4BE] font-light">
            Our most loved culinary creations, prepared fresh with artisanal attention to flavor and styling.
          </p>
        </div>

        {/* Bento Grid Featured Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((dish) => (
            <article
              key={dish.id}
              onClick={() => setSelectedProduct(dish)}
              className="group relative border border-[#4E4541]/60 bg-[#1A1814] flex flex-col hover:border-[#9A8E89] transition-all duration-500 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl"
            >
              {/* Photo with hover zoom */}
              <div className="w-full h-56 overflow-hidden relative bg-[#100E0A]">
                <img
                  src={dish.image}
                  alt={dish.altText}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Customer Favorite Tag */}
                <div className="absolute top-3 left-3 bg-[#382D28]/90 backdrop-blur-sm border border-[#E3BEB8]/40 px-2.5 py-1 text-[10px] font-sans-clean uppercase tracking-widest text-[#FAF4EC] flex items-center gap-1.5 shadow">
                  <span className="text-[#E3BEB8]">♡</span> CUSTOMER FAVORITE
                </div>

                {/* Quick view hover icon */}
                <div className="absolute inset-0 bg-[#15130F]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-3 py-1.5 bg-[#FAF4EC] text-[#382D28] text-[10px] font-sans-clean uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-lg">
                    <Eye className="w-3.5 h-3.5" /> View Details
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-serif-luxury text-lg text-[#FAF4EC] group-hover:text-[#E3BEB8] transition-colors leading-tight">
                      {dish.name}
                    </h3>
                  </div>
                  
                  {/* Dot leader price line */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-sans-clean uppercase tracking-wider text-[#9A8E89]">
                      {dish.category}
                    </span>
                    <div className="flex-grow border-b border-dotted border-[#4E4541] mx-2" />
                    <span className="font-serif-luxury text-base text-[#FAF4EC] font-semibold">
                      ₦{dish.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="font-sans-clean text-xs text-[#D1C4BE] line-clamp-2 leading-relaxed font-light">
                    {dish.description}
                  </p>
                </div>

                {/* Add to order button */}
                <button
                  onClick={(e) => handleQuickAdd(dish, e)}
                  className="w-full py-2.5 border border-[#9A8E89]/60 text-[#FAF4EC] font-sans-clean text-xs uppercase tracking-[0.18em] hover:bg-[#FAF4EC] hover:text-[#382D28] hover:border-[#FAF4EC] transition-colors duration-300 flex items-center justify-center gap-2 active:scale-98"
                  aria-label={`Add ${dish.name} to order`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD TO ORDER</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View full menu CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigateTo('menu')}
            className="px-8 py-3 bg-transparent border border-[#9A8E89] text-[#FAF4EC] hover:bg-[#FAF4EC] hover:text-[#382D28] font-sans-clean text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
          >
            VIEW FULL MENU ({MENU_ITEMS.length} DISHES)
          </button>
        </div>

      </div>
    </section>
  );
};
