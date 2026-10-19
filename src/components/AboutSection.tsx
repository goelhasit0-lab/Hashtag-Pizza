import React from 'react';
import { ArrowRight, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantInfo';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#060B18] border-t border-[#15274E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photo Collage Left */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#16274E] h-52 sm:h-64 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
                  alt="Fresh artisan pizza baking"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#16274E] h-36 sm:h-44 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
                  alt="Juicy loaded burgers"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="rounded-2xl border border-[#16274E] bg-gradient-to-br from-[#0B152B] via-[#0F1E3D] to-[#070D1E] p-6 h-36 sm:h-44 shadow-xl flex flex-col justify-center items-center text-center">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#142345] border border-[#FFCA28]/30 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFCA28] animate-pulse"></span>
                  <span className="text-[10px] font-bold text-[#FFCA28] uppercase tracking-wider">Est. 2022</span>
                </div>
                <span className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                  Hashtag Pizza
                </span>
                <span className="text-[11px] text-[#A3B3D4] mt-1 font-medium">
                  RB Complex · Adarshnagar
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#16274E] h-52 sm:h-64 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
                  alt="Creamy Italian pasta and shakes"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Authentic Story Right */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0B152B] border border-[#16274E] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#FFCA28]" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#FFCA28]">
                OUR RESTAURANT STORY
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-6">
              GOOD FOOD BRINGS <br />
              <span className="text-[#E92C2C]">PEOPLE TOGETHER.</span>
            </h2>

            <p className="text-base text-[#A3B3D4] leading-relaxed mb-6 font-normal">
              Good food brings people together. Since {restaurantInfo.establishedYear}, Hashtag Pizza
              has been serving a variety of pizzas, burgers, snacks, momos, noodles, wraps, shakes
              and more. Whether you're stopping by for a quick bite or sharing a meal with friends
              and family, there's something on our menu for everyone.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              <div className="p-4 rounded-xl bg-[#0B152B] border border-[#16274E]">
                <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                  <HeartHandshake className="w-4 h-4 text-[#E92C2C]" />
                  <span>Welcoming Atmosphere</span>
                </div>
                <p className="text-xs text-[#8B9DBF]">
                  A relaxed, casual dining spot in the heart of Adarshnagar for friends and families.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B152B] border border-[#16274E]">
                <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#FFCA28]" />
                  <span>Quality & Taste</span>
                </div>
                <p className="text-xs text-[#8B9DBF]">
                  From freshly prepared pizza dough to crisp golden momos and refreshing coolers.
                </p>
              </div>
            </div>

            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#E92C2C] hover:bg-[#D02222] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#E92C2C]/25"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
