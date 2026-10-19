import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Phone, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { restaurantInfo } from '../data/restaurantInfo';
import { HashtagLogo } from './HashtagLogo';

export const Header: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Favourites', href: '#favourites' },
    { label: 'Full Menu', href: '#menu' },
    { label: 'Offers', href: '#offers' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060B18]/95 backdrop-blur-md border-b border-[#15274E] py-3 shadow-xl shadow-black/40'
          : 'bg-gradient-to-b from-[#060B18]/95 via-[#060B18]/80 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
        {/* Official Brand Logo */}
        <a href="#home" className="group shrink min-w-0">
          <HashtagLogo size="md" variant="lockup" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#A3B3D4] hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#FFCA28] after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Call Link (Desktop) */}
          <a
            href={`tel:${restaurantInfo.phones.primary}`}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg bg-[#0B142A] border border-[#16274E] text-[#A3B3D4] hover:text-white hover:border-[#FFCA28] transition-colors"
            title="Call Restaurant Directly"
          >
            <Phone className="w-3.5 h-3.5 text-[#FFCA28]" />
            <span>{restaurantInfo.phones.primary}</span>
          </a>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-lg bg-[#0B142A] border border-[#16274E] hover:border-[#E92C2C] text-white transition-all cursor-pointer group"
            aria-label="View Cart and Order Summary"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#A3B3D4] group-hover:text-[#FFCA28] transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#E92C2C] text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center animate-pulse shadow-sm">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden md:inline text-xs font-semibold tracking-wide">
              {totalItems > 0 ? `${totalItems} items` : 'Cart'}
            </span>
          </button>

          {/* Primary Order Now Button */}
          <a
            href="#menu"
            className="hidden sm:inline-flex items-center justify-center text-xs uppercase tracking-wider font-bold px-4 py-2.5 rounded-lg bg-[#E92C2C] hover:bg-[#D02222] text-white shadow-lg shadow-[#E92C2C]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Order Now
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#0B142A] border border-[#16274E] text-[#A3B3D4] hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070D1E] border-b border-[#15274E] px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#A3B3D4] hover:text-white hover:bg-[#0E1A38] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 mt-1 border-t border-[#15274E] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-[#A3B3D4] px-3 py-1">
                <MapPin className="w-3.5 h-3.5 text-[#FFCA28]" />
                <span>{restaurantInfo.address.fullAddress}</span>
              </div>
              <a
                href={`tel:${restaurantInfo.phones.primary}`}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold bg-[#0E1A38] border border-[#1C3264] rounded-lg text-white"
              >
                <Phone className="w-3.5 h-3.5 text-[#FFCA28]" />
                <span>Call {restaurantInfo.phones.primary}</span>
              </a>
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center py-2.5 text-xs uppercase tracking-wider font-bold bg-[#E92C2C] text-white rounded-lg shadow"
              >
                Explore Full Menu
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
