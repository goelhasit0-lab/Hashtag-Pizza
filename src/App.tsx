import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PopularSection } from './components/PopularSection';
import { FullMenuSection } from './components/FullMenuSection';
import { CombosSection } from './components/CombosSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const MobileFloatingCartBar: React.FC = () => {
  const { totalItems, subtotal, setIsCartOpen } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-3 right-3 sm:left-4 sm:right-4 z-30 md:hidden animate-in slide-in-from-bottom duration-300">
      <button
        onClick={() => setIsCartOpen(true)}
        className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 rounded-xl bg-[#E92C2C] text-white shadow-2xl shadow-[#E92C2C]/40 font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-2 sm:gap-2.5">
          <ShoppingBag className="w-4 h-4 text-[#FFCA28]" />
          <span>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
          <span className="text-white/60">·</span>
          <span>Rs. {subtotal}</span>
        </div>

        <div className="flex items-center gap-1">
          <span>View Order</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
};

const MainContent: React.FC = () => {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#060B18] text-[#FFFFFF] font-sans selection:bg-[#E92C2C] selection:text-white">
      <Header />
      <main>
        <Hero />
        <PopularSection />
        <FullMenuSection />
        <CombosSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
      <MobileFloatingCartBar />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
