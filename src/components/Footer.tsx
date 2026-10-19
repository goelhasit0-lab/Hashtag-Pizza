import React from 'react';
import { Phone, MapPin, ArrowUp, ExternalLink } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantInfo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040812] border-t border-[#15274E] text-[#A3B3D4] text-xs pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#132247]">
          {/* Brand & Identity (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#1443B8] border border-white/20 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                #
              </div>
              <span className="font-heading font-extrabold text-lg text-white tracking-wider">
                HASHTAG <span className="text-[#FFCA28] font-serif italic">Pizza</span>
              </span>
            </div>

            <p className="text-xs text-[#8B9DBF] leading-relaxed max-w-sm">
              Good food, great mood. Serving freshly baked pizzas, loaded burgers, authentic Nepali
              momos, noodles, rolls, and cool drinks in Adarshnagar since {restaurantInfo.establishedYear}.
            </p>

            <div className="pt-2 text-[11px] text-[#FFCA28] font-semibold">
              Serving Happiness Since {restaurantInfo.establishedYear}
            </div>
          </div>

          {/* Quick Navigation (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#favourites" className="hover:text-white transition-colors">
                  Crowd Favourites
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Complete Digital Menu
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-white transition-colors">
                  More to Love & Combos
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Our Restaurant
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Location
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details & Phones (Col 8-12) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">
              Contact & Location
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E92C2C] shrink-0 mt-0.5" />
                <span>
                  {restaurantInfo.address.complex}, {restaurantInfo.address.street},{' '}
                  {restaurantInfo.address.area}, {restaurantInfo.address.city}, Nepal
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFCA28] shrink-0" />
                <div className="flex flex-wrap gap-2 text-white">
                  <a href={`tel:${restaurantInfo.phones.primary}`} className="hover:text-[#FFCA28]">
                    {restaurantInfo.phones.primary}
                  </a>
                  <span>·</span>
                  <a href={`tel:${restaurantInfo.phones.secondary}`} className="hover:text-[#FFCA28]">
                    {restaurantInfo.phones.secondary}
                  </a>
                  <span>·</span>
                  <a href={`tel:${restaurantInfo.phones.landline}`} className="hover:text-[#FFCA28]">
                    {restaurantInfo.phones.landline}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap gap-3">
              <a
                href={restaurantInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B152B] border border-[#16274E] text-white hover:border-[#E92C2C] transition-colors"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={restaurantInfo.social.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B152B] border border-[#16274E] text-[#A3B3D4] hover:text-white hover:border-[#FFCA28] transition-colors"
              >
                <span>Facebook</span>
              </a>

              <a
                href={restaurantInfo.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B152B] border border-[#16274E] text-[#A3B3D4] hover:text-white hover:border-[#FFCA28] transition-colors"
              >
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & scroll-to-top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#667EA6]">
          <div>
            © {currentYear} Hashtag Pizza, Adarshnagar. All original menu items, categories and prices
            preserved.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[#A3B3D4] hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
