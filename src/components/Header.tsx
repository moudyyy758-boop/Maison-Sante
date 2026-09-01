import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Menu as MenuIcon, X, Sun, Moon, Sparkles, ClipboardList } from 'lucide-react';
import { BowIcon } from './DecorativeElements';

export const Header: React.FC = () => {
  const { totalCartCount, setIsCartOpen, currentView, navigateTo, isLightMode, toggleTheme, allOrders } = useApp();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const navLinks = [
    { label: 'Home', view: 'home' as const },
    { label: 'Menu', view: 'menu' as const },
    { label: 'Order History', view: 'order-history' as const, badge: allOrders.length > 0 ? allOrders.length : undefined },
    { label: 'About', view: 'home' as const, sectionId: 'about-section' },
    { label: 'How It Works', view: 'home' as const, sectionId: 'how-it-works' },
    { label: 'Contact', view: 'home' as const, sectionId: 'contact-section' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#15130F]/95 dark:bg-[#15130F]/95 backdrop-blur-md border-b border-[#4E4541]/40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Mobile Hamburger & Brand */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="p-2 text-[#FAF4EC] hover:text-[#E3BEB8] focus:outline-none transition-colors"
              aria-label="Open menu navigation"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="text-left group"
            >
              <span className="font-serif-luxury text-lg tracking-widest font-normal text-[#FAF4EC] block leading-none">
                MS
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#D1ADA7] uppercase block mt-0.5">
                Maison de Santé
              </span>
            </button>
          </div>

          {/* Desktop Left: Monogram & Brand */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-10 h-10 border border-[#9A8E89]/40 flex items-center justify-center font-serif-luxury text-xl text-[#FAF4EC] group-hover:border-[#E3BEB8] transition-colors">
                MS
              </div>
              <div>
                <span className="font-serif-luxury text-xl tracking-[0.08em] text-[#FAF4EC] block group-hover:text-[#E3BEB8] transition-colors uppercase">
                  Maison de Santé
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#D1ADA7] uppercase block">
                  Good Food, Beautifully Made.
                </span>
              </div>
            </button>

            {/* Desktop Center/Nav Links */}
            <nav className="flex items-center gap-7 pl-6 border-l border-[#4E4541]/30">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => navigateTo(link.view, link.sectionId)}
                  className={`font-sans-clean text-xs uppercase tracking-[0.18em] transition-all py-1 relative flex items-center gap-1.5 ${
                    currentView === link.view && !link.sectionId
                      ? 'text-[#FAF4EC] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#E3BEB8]'
                      : 'text-[#D1C4BE] hover:text-[#FAF4EC]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge !== undefined && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-[#382D28] text-[#E3BEB8] border border-[#E3BEB8]/40 rounded-full font-bold">
                      {link.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Action Area */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* View Orders / Status link if orders exist */}
            {allOrders.length > 0 && (
              <button
                onClick={() => navigateTo('order-confirmation')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-[#4E4541] hover:border-[#9A8E89] text-[#D1C4BE] hover:text-[#FAF4EC] text-[11px] font-sans-clean uppercase tracking-wider transition-colors"
                title="View your submitted order request"
              >
                <ClipboardList className="w-3.5 h-3.5 text-[#E3BEB8]" />
                <span>My Request</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-[#FAF4EC] text-[#382D28] hover:bg-[#E3BEB8] hover:text-[#382D28] transition-all duration-300 font-sans-clean text-xs font-semibold uppercase tracking-[0.15em] active:scale-95"
              aria-label={`View Cart, ${totalCartCount} items`}
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#5A403C] text-[#FAF4EC] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#FAF4EC]">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">VIEW ORDER</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#15130F]/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#1D1B17] border-r border-[#4E4541] p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-300">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-[#4E4541]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-[#9A8E89]/40 flex items-center justify-center font-serif-luxury text-sm text-[#FAF4EC]">
                    MS
                  </div>
                  <div>
                    <h2 className="font-serif-luxury text-base tracking-widest text-[#FAF4EC] uppercase">
                      Maison de Santé
                    </h2>
                    <span className="text-[9px] text-[#D1ADA7] tracking-[0.2em] uppercase">Boutique Kitchen</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2 text-[#D1C4BE] hover:text-[#FAF4EC]"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="mt-8 flex flex-col gap-5">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      navigateTo(link.view, link.sectionId);
                    }}
                    className="text-left font-sans-clean text-sm uppercase tracking-[0.2em] text-[#FAF4EC] hover:text-[#E3BEB8] flex items-center justify-between py-2 border-b border-[#4E4541]/30 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span>{link.label}</span>
                      {link.badge !== undefined && (
                        <span className="text-[10px] px-1.5 py-0.2 bg-[#382D28] text-[#E3BEB8] border border-[#E3BEB8]/40 rounded-full font-bold">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <BowIcon size={14} className="text-[#9A8E89]" />
                  </button>
                ))}
              </nav>

              {/* Order Status quick link */}
              {allOrders.length > 0 && (
                <div className="mt-6 pt-4 border-t border-[#4E4541]/40">
                  <button
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      navigateTo('order-confirmation');
                    }}
                    className="w-full text-left font-sans-clean text-xs uppercase tracking-widest text-[#E3BEB8] flex items-center gap-2"
                  >
                    <ClipboardList className="w-4 h-4" />
                    <span>View Submitted Request ({allOrders[0].orderId})</span>
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-[#4E4541] text-center">
              <p className="font-serif-luxury text-xs text-[#FAF4EC] tracking-wider mb-2">
                “Good food, beautifully made.”
              </p>
              <span className="text-[10px] text-[#9A8E89] block tracking-widest uppercase">
                Victoria Island / Ikoyi, Lagos
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
