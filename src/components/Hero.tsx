import React from 'react';
import { ArrowRight, Flame, Clock, UtensilsCrossed, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { restaurantInfo } from '../data/restaurantInfo';
import { HashtagLogo } from './HashtagLogo';

export const Hero: React.FC = () => {
  const { setIsCartOpen } = useCart();

  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#060B18] w-full max-w-full">
      {/* Background Ambient Glows */}
      <div
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#1443B8]/25 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#E92C2C]/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#FFCA28]/10 rounded-full blur-[110px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B142A] border border-[#182C58] mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E92C2C] animate-ping" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#FFCA28]">
                SERVING HAPPINESS SINCE {restaurantInfo.establishedYear}
              </span>
            </div>

            {/* Large Bold Headline matching logo font styling */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-6">
              GOOD FOOD. <br className="hidden sm:inline" />
              GREAT MOOD. <br />
              <span className="inline-flex items-baseline gap-1.5 flex-wrap">
                <span className="text-[#E92C2C]">#</span>
                <span className="text-white">HASHTAG</span>
                <span className="text-[#FFCA28] font-script italic text-4xl sm:text-6xl lg:text-7xl font-bold ml-1 drop-shadow-md">
                  Pizza
                </span>
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#A3B3D4] max-w-xl leading-relaxed mb-8 font-normal">
              From cheesy pizzas and loaded burgers to crispy fried chicken, momos and refreshing
              drinks, find your favourites at Hashtag Pizza.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#E92C2C] hover:bg-[#D02222] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-[#E92C2C]/30 hover:shadow-[#E92C2C]/50 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>EXPLORE OUR MENU</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsCartOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0B142A] hover:bg-[#122044] border border-[#1C3264] hover:border-[#FFCA28] text-white font-bold text-sm tracking-wider uppercase transition-all cursor-pointer"
              >
                <Flame className="w-4 h-4 text-[#FFCA28]" />
                <span>ORDER NOW</span>
              </button>
            </div>

            {/* Mini Contact Bar */}
            <div className="mt-8 pt-6 border-t border-[#132247] flex flex-wrap items-center gap-6 text-xs text-[#A3B3D4]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E92C2C]" />
                <span>RB Complex, Loharpati, Adarshnagar</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FFCA28] font-semibold">Takeaway & Dine-in</span>
                <span>·</span>
                <span>Birgunj, Nepal</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Food Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1443B8]/40 via-[#E92C2C]/25 to-[#FFCA28]/20 rounded-3xl blur-2xl transform rotate-3 scale-95" />

            <div className="relative w-full max-w-md sm:max-w-lg">
              {/* Main Pizza Card */}
              <div className="relative rounded-2xl overflow-hidden border border-[#1A3166] bg-[#0B142A] shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=85"
                  alt="Freshly baked artisan cheese pizza with herb crust at Hashtag Pizza"
                  className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-[#060B18]/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#FFCA28] font-semibold">
                      Freshly Baked Daily
                    </span>
                    <h3 className="font-heading font-bold text-lg text-white">
                      100% Mozzarella & Hand-Tossed Dough
                    </h3>
                  </div>
                  <a
                    href="#menu"
                    className="text-xs font-semibold px-3 py-1.5 rounded bg-[#E92C2C] text-white hover:bg-[#D02222] transition-colors"
                  >
                    View Pizzas
                  </a>
                </div>
              </div>

              {/* Floating Official Circular Brand Emblem */}
              <div className="absolute -top-7 -right-6 hidden sm:flex items-center justify-center p-2 rounded-full bg-[#060B18]/90 border-2 border-[#164EAC] shadow-2xl backdrop-blur-md hover:scale-110 transition-transform">
                <HashtagLogo size="lg" variant="badge" />
              </div>

              {/* Floating Small Food Accent: Burger */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-2.5 rounded-xl bg-[#0B142A]/95 border border-[#1A3166] shadow-xl backdrop-blur-md">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80"
                  alt="Crispy burger preview"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="pr-2">
                  <p className="text-xs font-bold text-white leading-tight">Maharaja Burger</p>
                  <p className="text-[10px] text-[#FFCA28] font-medium">Double Loaded Patty</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Three Compact Highlights */}
        <div className="mt-16 pt-8 border-t border-[#132247] grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0B142A]/80 border border-[#16274E]">
            <div className="w-12 h-12 rounded-lg bg-[#101F42] border border-[#1A3570] flex items-center justify-center text-[#FFCA28] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">Serving Since 2022</h4>
              <p className="text-xs text-[#A3B3D4] mt-0.5">
                Over 2 years of bringing delicious meals to our community.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0B142A]/80 border border-[#16274E]">
            <div className="w-12 h-12 rounded-lg bg-[#101F42] border border-[#1A3570] flex items-center justify-center text-[#E92C2C] shrink-0">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">A Menu Full of Favourites</h4>
              <p className="text-xs text-[#A3B3D4] mt-0.5">
                Pizzas, burgers, rolls, momos, noodles, fried chicken & shakes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0B142A]/80 border border-[#16274E]">
            <div className="w-12 h-12 rounded-lg bg-[#101F42] border border-[#1A3570] flex items-center justify-center text-[#1443B8] shrink-0">
              <MapPin className="w-6 h-6 text-[#4D82F3]" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">Find Us in Adarshnagar</h4>
              <p className="text-xs text-[#A3B3D4] mt-0.5">
                Conveniently located at RB Complex, Loharpati, Birgunj.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
