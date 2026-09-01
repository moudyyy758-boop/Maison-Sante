import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS } from '../data/menuData';
import { CategoryType, DietaryTag, MenuItem } from '../types';
import { Search, Sparkles, Filter, X, Plus, Eye, Flame, Leaf } from 'lucide-react';
import { BowIcon, DelicateDivider } from './DecorativeElements';

export const MenuSection: React.FC<{ isStandalonePage?: boolean }> = ({ isStandalonePage = false }) => {
  const {
    setSelectedProduct,
    addToCart,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
  } = useApp();

  const [selectedTag, setSelectedTag] = useState<DietaryTag | 'All'>('All');

  const categories: CategoryType[] = [
    'All',
    'Breakfast',
    'Main Dishes',
    'Sides',
    'Salads',
    'Desserts',
    'Drinks',
  ];

  const filterTags: { label: string; value: DietaryTag | 'All' }[] = [
    { label: 'All Dishes', value: 'All' },
    { label: 'Popular', value: 'Popular' },
    { label: 'Customer Favorites', value: 'Customer Favorite' },
    { label: 'New Additions', value: 'New' },
    { label: 'Vegetarian', value: 'Vegetarian' },
    { label: 'Spicy', value: 'Spicy' },
  ];

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category check
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;

      // Tag check
      const matchesTag =
        selectedTag === 'All' ||
        item.tags.includes(selectedTag) ||
        (selectedTag === 'Vegetarian' && item.isVegetarian) ||
        (selectedTag === 'Spicy' && item.isSpicy);

      // Search check
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(q));

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [activeCategory, selectedTag, searchQuery]);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const hasRequired = (item.customizationGroups || item.customizations)?.some((g) => g.required);
    if (hasRequired) {
      setSelectedProduct(item);
    } else {
      addToCart(item, 1, []);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setSelectedTag('All');
  };

  return (
    <section id="menu-section" className={`w-full bg-[#15130F] ${isStandalonePage ? 'py-12' : 'py-20'} px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-sans-clean text-xs font-semibold uppercase tracking-[0.25em] text-[#E3BEB8] flex items-center justify-center gap-2">
            <BowIcon size={14} /> CURATED CULINARY CATALOG <BowIcon size={14} />
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#FAF4EC] uppercase tracking-tight mt-2 mb-3">
            THE MAISON MENU
          </h2>
          <DelicateDivider icon="flower" className="max-w-[180px] my-3" />
          <p className="font-sans-clean text-sm text-[#D1C4BE] font-light">
            Thoughtfully crafted dishes made with farm-fresh ingredients, delicate spices, and artistic presentation.
          </p>
        </div>

        {/* Search Bar & Filter Controls */}
        <div className="max-w-3xl mx-auto mb-8 space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#9A8E89] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search the menu by dish name, category, or ingredient..."
              className="w-full bg-[#1D1B17] border border-[#4E4541] focus:border-[#FAF4EC] text-[#FAF4EC] placeholder-[#9A8E89]/60 pl-11 pr-10 py-3 text-xs sm:text-sm font-sans-clean transition-colors focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A8E89] hover:text-[#FAF4EC] p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dietary / Special Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scroll pb-1">
            <span className="text-[11px] font-sans-clean uppercase tracking-wider text-[#9A8E89] flex items-center gap-1 pl-1 flex-shrink-0">
              <Filter className="w-3 h-3 text-[#E3BEB8]" /> Filter:
            </span>
            {filterTags.map((tag) => (
              <button
                key={tag.value}
                onClick={() => setSelectedTag(tag.value)}
                className={`px-3 py-1 text-[11px] font-sans-clean uppercase tracking-wider whitespace-nowrap transition-all border ${
                  selectedTag === tag.value
                    ? 'bg-[#FAF4EC] text-[#382D28] border-[#FAF4EC] font-semibold'
                    : 'bg-[#1D1B17] text-[#D1C4BE] border-[#4E4541] hover:border-[#9A8E89]'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

        </div>

        {/* Category Navigation Tabs */}
        <div className="flex overflow-x-auto hide-scroll border-b border-[#4E4541]/40 mb-12 pb-1 gap-6 sm:gap-8 justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-3 font-sans-clean text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-all border-b-2 ${
                activeCategory === cat
                  ? 'text-[#FAF4EC] border-[#FAF4EC] font-semibold'
                  : 'text-[#9A8E89] border-transparent hover:text-[#FAF4EC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dish Grid / Bento Cards */}
        {filteredDishes.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 border border-[#4E4541]/40 bg-[#1D1B17] max-w-xl mx-auto p-8">
            <div className="w-14 h-14 border border-[#4E4541] flex items-center justify-center mx-auto mb-4 bg-[#15130F]">
              <BowIcon size={24} className="text-[#9A8E89]" />
            </div>
            <h3 className="font-serif-luxury text-xl text-[#FAF4EC] uppercase mb-2">
              NOTHING FOUND
            </h3>
            <p className="font-sans-clean text-xs sm:text-sm text-[#D1C4BE] font-light mb-6">
              We couldn't find any dishes matching your current selection. Try another search or reset filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-[#FAF4EC] text-[#382D28] hover:bg-[#E3BEB8] font-sans-clean text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
            >
              VIEW ALL MENU ITEMS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <article
                key={dish.id}
                onClick={() => setSelectedProduct(dish)}
                className="group relative border border-[#4E4541]/60 bg-[#1A1814] flex flex-col hover:border-[#9A8E89] transition-all duration-500 cursor-pointer overflow-hidden shadow-sm hover:shadow-2xl"
              >
                {/* Photo with hover zoom */}
                <div className="w-full h-64 overflow-hidden relative bg-[#100E0A]">
                  <img
                    src={dish.image}
                    alt={dish.altText}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {dish.tags.includes('Customer Favorite') && (
                      <span className="bg-[#382D28]/95 backdrop-blur-sm border border-[#E3BEB8]/40 px-2 py-0.5 text-[9px] font-sans-clean uppercase tracking-widest text-[#FAF4EC] flex items-center gap-1 shadow">
                        <span className="text-[#E3BEB8]">♡</span> FAVORITE
                      </span>
                    )}
                    {dish.tags.includes('Popular') && !dish.tags.includes('Customer Favorite') && (
                      <span className="bg-[#2C2A25]/95 backdrop-blur-sm border border-[#9A8E89]/40 px-2 py-0.5 text-[9px] font-sans-clean uppercase tracking-widest text-[#FAF4EC] shadow">
                        POPULAR
                      </span>
                    )}
                    {dish.tags.includes('New') && (
                      <span className="bg-[#5A403C]/95 backdrop-blur-sm border border-[#E3BEB8]/40 px-2 py-0.5 text-[9px] font-sans-clean uppercase tracking-widest text-[#FAF4EC] shadow">
                        NEW DISH
                      </span>
                    )}
                  </div>

                  {/* Dietary icons (Vegetarian/Spicy) */}
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    {dish.isVegetarian && (
                      <span className="w-6 h-6 bg-[#15130F]/90 border border-[#4E4541] rounded-full flex items-center justify-center text-[#A39584]" title="Vegetarian">
                        <Leaf className="w-3 h-3 text-[#A39584]" />
                      </span>
                    )}
                    {dish.isSpicy && (
                      <span className="w-6 h-6 bg-[#15130F]/90 border border-[#4E4541] rounded-full flex items-center justify-center text-[#E3BEB8]" title="Spicy">
                        <Flame className="w-3 h-3 text-[#E3BEB8]" />
                      </span>
                    )}
                  </div>

                  {/* Hover Quick View banner */}
                  <div className="absolute inset-0 bg-[#15130F]/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-3.5 py-1.5 bg-[#FAF4EC] text-[#382D28] text-[10px] font-sans-clean uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-xl">
                      <Eye className="w-3.5 h-3.5" /> Customize & Order
                    </span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                  <div>
                    {/* Dish Name & Dot Leader Price */}
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-serif-luxury text-lg text-[#FAF4EC] group-hover:text-[#E3BEB8] transition-colors leading-snug">
                        {dish.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-sans-clean uppercase tracking-widest text-[#9A8E89]">
                        {dish.category}
                      </span>
                      <div className="flex-grow border-b border-dotted border-[#4E4541] mx-2" />
                      <span className="font-serif-luxury text-base text-[#FAF4EC] font-semibold">
                        ₦{dish.price.toLocaleString()}
                      </span>
                    </div>

                    <p className="font-sans-clean text-xs text-[#D1C4BE] line-clamp-2 leading-relaxed font-light mb-3">
                      {dish.description}
                    </p>

                    {/* Ingredients summary */}
                    <div className="flex flex-wrap gap-1">
                      {dish.ingredients.slice(0, 3).map((ing) => (
                        <span
                          key={ing}
                          className="text-[10px] font-sans-clean text-[#9A8E89] bg-[#1D1B17] px-1.5 py-0.5 border border-[#4E4541]/40"
                        >
                          {ing}
                        </span>
                      ))}
                      {dish.ingredients.length > 3 && (
                        <span className="text-[10px] font-sans-clean text-[#9A8E89] px-1 py-0.5">
                          +{dish.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
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
        )}

      </div>
    </section>
  );
};
