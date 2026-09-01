import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { BowIcon, DelicateDivider } from './DecorativeElements';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalCartCount,
    navigateTo,
    allOrders,
  } = useApp();

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[75] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#15130F]/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <aside className="relative w-full max-w-md bg-[#1D1B17] text-[#FAF4EC] h-full border-l border-[#4E4541] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 z-10">
        
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#4E4541] flex items-center justify-between bg-[#15130F]">
          <div className="flex items-center gap-3">
            <h2 id="cart-title" className="font-serif-luxury text-xl text-[#FAF4EC] uppercase tracking-wide">
              YOUR ORDER
            </h2>
            {totalCartCount > 0 && (
              <span className="px-2.5 py-0.5 bg-[#382D28] border border-[#9A8E89]/40 text-[#E3BEB8] text-xs font-sans-clean">
                {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] font-sans-clean uppercase tracking-wider text-[#9A8E89] hover:text-[#FAF4EC] transition-colors"
                title="Clear all items"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#D1C4BE] hover:text-[#FAF4EC] hover:bg-[#2C2A25] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
              <div className="w-16 h-16 border border-[#4E4541] flex items-center justify-center mb-4 bg-[#15130F]">
                <ShoppingBag className="w-7 h-7 text-[#9A8E89]" />
              </div>
              <h3 className="font-serif-luxury text-lg text-[#FAF4EC] uppercase mb-1">
                YOUR ORDER IS WAITING
              </h3>
              <p className="font-sans-clean text-xs text-[#D1C4BE] font-light max-w-xs mb-6">
                Add something delicious from our menu to begin your culinary order request.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('menu');
                  }}
                  className="px-6 py-2.5 bg-[#FAF4EC] text-[#382D28] hover:bg-[#E3BEB8] font-sans-clean text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
                >
                  EXPLORE MENU
                </button>
                {allOrders.length > 0 && (
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('order-history');
                    }}
                    className="px-4 py-2.5 bg-transparent border border-[#4E4541] hover:border-[#9A8E89] text-[#D1ADA7] hover:text-[#FAF4EC] font-sans-clean text-xs uppercase tracking-wider transition-colors"
                  >
                    PAST ORDERS ({allOrders.length})
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-[#4E4541]/40">
              {cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail image */}
                  <div className="w-20 h-20 bg-[#100E0A] border border-[#4E4541] flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif-luxury text-sm text-[#FAF4EC] leading-tight">
                          {item.name}
                        </h4>
                        <span className="font-serif-luxury text-sm font-semibold text-[#FAF4EC] whitespace-nowrap">
                          ₦{item.totalPrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Customizations tags */}
                      {item.selectedCustomizations.length > 0 && (
                        <div className="text-[11px] font-sans-clean text-[#D1ADA7] mt-1 space-y-0.5">
                          {item.selectedCustomizations.map((c) => (
                            <div key={c.groupId + c.optionId} className="flex justify-between text-[10px]">
                              <span>• {c.optionName}</span>
                              {c.priceDelta !== 0 && (
                                <span>{c.priceDelta > 0 ? `+₦${c.priceDelta}` : `-₦${Math.abs(c.priceDelta)}`}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Spice level */}
                      {item.spiceLevel && (
                        <span className="text-[10px] font-sans-clean text-[#E3BEB8] block mt-0.5">
                          Spice: {item.spiceLevel}
                        </span>
                      )}

                      {/* Special instructions */}
                      {item.specialInstructions && (
                        <p className="text-[10px] font-sans-clean text-[#9A8E89] italic mt-0.5 line-clamp-1">
                          “{item.specialInstructions}”
                        </p>
                      )}
                    </div>

                    {/* Quantity Stepper & Remove */}
                    <div className="flex justify-between items-center mt-3 pt-2">
                      <div className="flex items-center border border-[#4E4541] bg-[#15130F]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-[#D1C4BE] hover:text-[#FAF4EC] hover:bg-[#2C2A25] transition-colors text-xs"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 font-sans-clean text-xs font-semibold min-w-[1.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-[#D1C4BE] hover:text-[#FAF4EC] hover:bg-[#2C2A25] transition-colors text-xs"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#D1ADA7] hover:text-[#FFB4AB] text-[11px] font-sans-clean uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer / Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 bg-[#15130F] border-t border-[#4E4541] space-y-4">
            
            {/* Calculation Breakdown */}
            <div className="space-y-2 text-xs font-sans-clean">
              <div className="flex justify-between text-[#D1C4BE]">
                <span>Subtotal</span>
                <span className="font-serif-luxury text-sm font-semibold text-[#FAF4EC]">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[#9A8E89]">
                <span>Estimated Delivery</span>
                <span className="italic text-[11px] text-[#D1ADA7]">To be confirmed</span>
              </div>
              <div className="pt-2 border-t border-[#4E4541]/50 flex justify-between items-baseline">
                <span className="font-serif-luxury text-base text-[#FAF4EC] uppercase">Total Request</span>
                <span className="font-serif-luxury text-xl font-bold text-[#FAF4EC]">
                  ₦{subtotal.toLocaleString()}*
                </span>
              </div>
              <p className="text-[10px] text-[#9A8E89] font-light leading-normal">
                *Final delivery charge will be confirmed with you prior to meal preparation.
              </p>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                navigateTo('order');
              }}
              className="w-full py-3.5 bg-[#FAF4EC] text-[#382D28] hover:bg-[#E3BEB8] font-sans-clean text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 active:scale-98 shadow-lg"
            >
              <span>CHECKOUT & ENTER DETAILS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </aside>
    </div>
  );
};
