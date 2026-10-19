import React from 'react';
import { Plus, Check, Sparkles } from 'lucide-react';
import { COMBOS_DATA, ComboOffer } from '../data/combosData';
import { useCart } from '../context/CartContext';

export const CombosSection: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddCombo = (combo: ComboOffer) => {
    addToCart({
      menuItemId: combo.id,
      name: combo.title,
      category: 'Bowls Combo',
      variantLabel: combo.tagline,
      selectedPrice: combo.price,
      quantity: 1,
      isVeg: combo.id === 'combo-everyday-meal',
      image: combo.image,
    });
  };

  return (
    <section id="offers" className="py-20 bg-[#070D1E] border-t border-[#15274E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFCA28]">
            Curated Feasts & Pairings
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight mt-1">
            MORE TO <span className="text-[#FFCA28]">LOVE</span>
          </h2>
          <p className="text-sm text-[#A3B3D4] mt-2">
            Explore authentic restaurant specials and delicious food pairings created from our
            genuine in-store menu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMBOS_DATA.map((combo) => (
            <div
              key={combo.id}
              className="flex flex-col justify-between rounded-2xl bg-[#0B152B] border border-[#16274E] hover:border-[#1F3F7A] transition-all overflow-hidden group hover:shadow-2xl hover:shadow-black"
            >
              {/* Image banner */}
              <div className="relative h-48 w-full overflow-hidden bg-[#0F1C3A]">
                <img
                  src={combo.image}
                  alt={combo.title}
                  className="w-full h-full object-cover object-center filter contrast-[1.06] saturate-[1.12] group-hover:scale-108 transition-all duration-700 ease-out transform-gpu"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B152B] via-black/30 to-transparent" />

                {combo.badge && (
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#060B18]/90 border border-[#FFCA28]/50 text-[#FFCA28] text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 text-[#FFCA28]" />
                    <span>{combo.badge}</span>
                  </div>
                )}
              </div>

              {/* Combo Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-medium text-[#A3B3D4] uppercase tracking-wider">
                    {combo.tagline}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-white tracking-tight mt-1">
                    {combo.title}
                  </h3>
                  <p className="text-xs text-[#A3B3D4] mt-2 leading-relaxed">
                    {combo.description}
                  </p>

                  {/* Included items checklist */}
                  <div className="mt-4 pt-4 border-t border-[#142345] space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#FFCA28] tracking-wider block">
                      What's Included:
                    </span>
                    {combo.itemsIncluded.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#A3B3D4]">
                        <Check className="w-3.5 h-3.5 text-[#8EAD48] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Price & CTA */}
                <div className="mt-6 pt-4 border-t border-[#142345] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8B9DBF] block">Total Combo Price</span>
                    <span className="font-heading font-extrabold text-xl text-[#FFCA28]">
                      Rs. {combo.price}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddCombo(combo)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E92C2C] hover:bg-[#D02222] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Combo</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notice for Restaurant Owner */}
        <div className="mt-10 p-4 rounded-xl bg-[#0B152B] border border-[#16274E] text-center max-w-xl mx-auto">
          <p className="text-xs text-[#8B9DBF]">
            Note: All combos and specials are constructed from genuine Hashtag Pizza menu offerings.
            Prices and availability are subject to in-store confirmation upon order placement.
          </p>
        </div>
      </div>
    </section>
  );
};
