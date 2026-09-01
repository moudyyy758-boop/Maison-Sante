import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem, SelectedCustomization } from '../types';
import { X, Plus, Minus, Check, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import { BowIcon } from './DecorativeElements';

export const FoodDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<SelectedCustomization[]>([]);
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Medium' | 'Spicy' | undefined>(undefined);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Reset state when product opens
  useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
      setSpecialInstructions('');
      
      // Default spice level if item is marked spicy
      if (selectedProduct.isSpicy) {
        setSpiceLevel('Medium');
      } else {
        setSpiceLevel(undefined);
      }

      // Default required radio groups
      const initialCustomizations: SelectedCustomization[] = [];
      const groups = selectedProduct.customizationGroups || selectedProduct.customizations || [];
      groups.forEach((group) => {
        if (group.type === 'radio' && group.options.length > 0) {
          const defaultOpt = group.options[0];
          initialCustomizations.push({
            groupId: group.id,
            groupName: group.name,
            optionId: defaultOpt.id,
            optionName: defaultOpt.name,
            priceDelta: defaultOpt.priceDelta,
          });
        }
      });
      setSelectedCustomizations(initialCustomizations);
    }
  }, [selectedProduct]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProduct) {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct, setSelectedProduct]);

  if (!selectedProduct) return null;

  // Toggle radio customization
  const handleRadioChange = (
    groupId: string,
    groupName: string,
    optionId: string,
    optionName: string,
    priceDelta: number
  ) => {
    setSelectedCustomizations((prev) => {
      const filtered = prev.filter((c) => c.groupId !== groupId);
      return [...filtered, { groupId, groupName, optionId, optionName, priceDelta }];
    });
  };

  // Toggle checkbox customization
  const handleCheckboxToggle = (
    groupId: string,
    groupName: string,
    optionId: string,
    optionName: string,
    priceDelta: number
  ) => {
    setSelectedCustomizations((prev) => {
      const exists = prev.some((c) => c.groupId === groupId && c.optionId === optionId);
      if (exists) {
        return prev.filter((c) => !(c.groupId === groupId && c.optionId === optionId));
      } else {
        return [...prev, { groupId, groupName, optionId, optionName, priceDelta }];
      }
    });
  };

  // Calculate dynamic unit & total prices
  const customizationsDelta = selectedCustomizations.reduce((acc, curr) => acc + curr.priceDelta, 0);
  const unitPrice = Math.max(0, selectedProduct.price + customizationsDelta);
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    addToCart(selectedProduct, quantity, selectedCustomizations, spiceLevel, specialInstructions);
    setSelectedProduct(null);
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-food-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#100E0A]/85 backdrop-blur-md transition-opacity"
        onClick={() => setSelectedProduct(null)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#1A1814] border border-[#9A8E89]/40 text-[#FAF4EC] shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-[#15130F]/80 hover:bg-[#FAF4EC] text-[#FAF4EC] hover:text-[#15130F] flex items-center justify-center transition-colors border border-[#4E4541]"
          aria-label="Close dish modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-0">
          
          {/* Large Realistic Food Photograph */}
          <div className="relative w-full h-72 sm:h-80 bg-[#100E0A] overflow-hidden">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.altText}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1814] via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <span className="px-3 py-1 bg-[#382D28]/90 border border-[#E3BEB8]/40 text-[11px] font-sans-clean uppercase tracking-widest text-[#E3BEB8]">
                {selectedProduct.category}
              </span>
              <span className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF4EC] font-bold drop-shadow">
                ₦{selectedProduct.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Dish Details */}
          <div className="p-6 sm:p-8 space-y-6">
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BowIcon size={14} className="text-[#E3BEB8]" />
                <span className="text-[10px] font-sans-clean uppercase tracking-[0.25em] text-[#D1ADA7]">
                  Maison Culinary Creation
                </span>
              </div>
              <h2 id="modal-food-title" className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF4EC] uppercase">
                {selectedProduct.name}
              </h2>
              <p className="font-sans-clean text-sm text-[#D1C4BE] font-light leading-relaxed mt-2">
                {selectedProduct.description}
              </p>
            </div>

            {/* Ingredients & Allergens Badges */}
            <div className="border-y border-[#4E4541]/40 py-4 space-y-3">
              <div>
                <h4 className="text-[11px] font-sans-clean uppercase tracking-widest text-[#9A8E89] mb-1.5 font-semibold">
                  Prepared With
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-2.5 py-1 bg-[#211F1B] border border-[#4E4541] text-xs font-sans-clean text-[#D1C4BE]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProduct.allergens && selectedProduct.allergens.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-[#E3BEB8] pt-1">
                  <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>
                    <strong>Allergen Notice:</strong> Contains {selectedProduct.allergens.join(', ')}.
                  </span>
                </div>
              )}
            </div>

            {/* Customization Options */}
            {((selectedProduct.customizationGroups && selectedProduct.customizationGroups.length > 0) || (selectedProduct.customizations && selectedProduct.customizations.length > 0)) && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="font-serif-luxury text-lg text-[#FAF4EC] uppercase">Customization</span>
                  <div className="flex-grow border-b border-[#4E4541]/40" />
                </div>

                {(selectedProduct.customizationGroups || selectedProduct.customizations || []).map((group) => (
                  <div key={group.id} className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-sans-clean uppercase tracking-wider text-[#FAF4EC]">
                      <span>{group.name}</span>
                      {group.required && <span className="text-[#D1ADA7] text-[10px]">Required</span>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {group.options.map((opt) => {
                        const isSelected = selectedCustomizations.some(
                          (c) => c.groupId === group.id && c.optionId === opt.id
                        );

                        return (
                          <label
                            key={opt.id}
                            className={`flex items-center justify-between p-3 border cursor-pointer transition-all ${
                              isSelected
                                ? 'border-[#FAF4EC] bg-[#2C2A25] text-[#FAF4EC]'
                                : 'border-[#4E4541] bg-[#1D1B17] text-[#D1C4BE] hover:border-[#9A8E89]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type={group.type}
                                name={group.id}
                                checked={isSelected}
                                onChange={() => {
                                  if (group.type === 'radio') {
                                    handleRadioChange(group.id, group.name, opt.id, opt.name, opt.priceDelta);
                                  } else {
                                    handleCheckboxToggle(group.id, group.name, opt.id, opt.name, opt.priceDelta);
                                  }
                                }}
                                className="sr-only"
                              />
                              <div
                                className={`w-4 h-4 rounded-none border flex items-center justify-center ${
                                  isSelected ? 'border-[#FAF4EC] bg-[#FAF4EC] text-[#15130F]' : 'border-[#9A8E89]'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className="text-xs font-sans-clean">{opt.name}</span>
                            </div>

                            {opt.priceDelta !== 0 && (
                              <span className="text-xs font-sans-clean text-[#E3BEB8] font-medium">
                                {opt.priceDelta > 0 ? `+₦${opt.priceDelta.toLocaleString()}` : `-₦${Math.abs(opt.priceDelta).toLocaleString()}`}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Optional Spice Level Selector if applicable */}
            {(selectedProduct.category === 'Main Dishes' || selectedProduct.isSpicy) && (
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-1.5 text-xs font-sans-clean uppercase tracking-wider text-[#FAF4EC]">
                  <Flame className="w-3.5 h-3.5 text-[#E3BEB8]" />
                  <span>Spice Level</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['Mild', 'Medium', 'Spicy'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSpiceLevel(level)}
                      className={`py-2 text-xs font-sans-clean uppercase tracking-wider border transition-colors ${
                        spiceLevel === level
                          ? 'border-[#FAF4EC] bg-[#FAF4EC] text-[#382D28] font-semibold'
                          : 'border-[#4E4541] bg-[#1D1B17] text-[#D1C4BE] hover:border-[#9A8E89]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Special Instructions Input */}
            <div className="space-y-2 pt-2">
              <label htmlFor="special-instructions" className="block text-xs font-sans-clean uppercase tracking-wider text-[#FAF4EC]">
                Special Instructions
              </label>
              <textarea
                id="special-instructions"
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Any special preparation preferences, extra cutlery, or allergen alerts?"
                className="w-full bg-[#1D1B17] border border-[#4E4541] text-[#FAF4EC] placeholder-[#9A8E89]/60 p-3 text-xs font-sans-clean focus:outline-none focus:border-[#FAF4EC] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Modal Bottom Fixed Actions */}
        <div className="p-6 bg-[#15130F] border-t border-[#4E4541] flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quantity Stepper */}
          <div className="flex items-center border border-[#9A8E89]/60 bg-[#1D1B17]">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="px-3.5 py-2.5 text-[#FAF4EC] hover:bg-[#FAF4EC]/10 disabled:opacity-30 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-4 font-sans-clean font-semibold text-sm min-w-[2.5rem] text-center text-[#FAF4EC]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3.5 py-2.5 text-[#FAF4EC] hover:bg-[#FAF4EC]/10 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Order CTA */}
          <button
            type="button"
            onClick={handleAdd}
            className="w-full sm:flex-1 py-3 bg-[#FAF4EC] text-[#382D28] hover:bg-[#E3BEB8] hover:text-[#382D28] font-sans-clean text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-between px-6 shadow-md active:scale-98"
          >
            <span>ADD TO ORDER</span>
            <span className="font-serif-luxury font-bold text-sm">
              ₦{totalPrice.toLocaleString()}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
