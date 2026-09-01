import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero, HeroFeatures } from './components/Hero';
import { FeaturedMenu } from './components/FeaturedMenu';
import { MenuSection } from './components/MenuSection';
import { AboutSection, HowItWorks } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { OrderForm } from './components/OrderForm';
import { OrderConfirmation } from './components/OrderConfirmation';
import { OrderHistory } from './components/OrderHistory';
import { FoodDetailModal } from './components/FoodDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#15130F] text-[#FAF4EC] selection:bg-[#E3BEB8] selection:text-[#382D28] font-sans-clean transition-colors duration-300">
      {/* Sticky Header */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <>
            <Hero />
            <HeroFeatures />
            <FeaturedMenu />
            <MenuSection isStandalonePage={false} />
            <AboutSection />
            <HowItWorks />
            <FAQSection />
            <ContactSection />
          </>
        )}

        {currentView === 'menu' && (
          <MenuSection isStandalonePage={true} />
        )}

        {currentView === 'order' && (
          <OrderForm />
        )}

        {currentView === 'order-confirmation' && (
          <OrderConfirmation />
        )}

        {currentView === 'order-history' && (
          <OrderHistory />
        )}
      </main>

      {/* Global Modals & Drawers */}
      <FoodDetailModal />
      <CartDrawer />
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
