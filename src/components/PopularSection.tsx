import React, { useState } from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PizzaSize } from '../types';

interface PopularCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  isVeg: boolean;
  price?: number;
  pizzaPrices?: { S: number; M: number; L: number };
  momoVariants?: { label: 'Veg' | 'Paneer' | 'Chicken'; price: number }[];
  chickenOptions?: { label: string; price: number }[];
}

const POPULAR_ITEMS: PopularCardProps[] = [
  {
    id: 'vp-1',
    name: 'Margherita Pizza',
    category: 'Vegetarian Pizza',
    description: 'Classic rich tomato sauce loaded with 100% pure mozzarella cheese & fragrant basil herbs.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    pizzaPrices: { S: 240, M: 420, L: 620 },
  },
  {
    id: 'vp-6',
    name: 'Fresh Veggie Pizza',
    category: 'Vegetarian Pizza',
    description: 'Onions, crisp green capsicum, juicy tomatoes, and golden sweet corn over gooey mozzarella.',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    pizzaPrices: { S: 280, M: 490, L: 720 },
  },
  {
    id: 'vp-21',
    name: 'Paneer Overloaded Pizza',
    category: 'Vegetarian Pizza',
    description: 'Generous portions of marinated paneer chunks, extra mozzarella, and seasoned bell peppers.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    pizzaPrices: { S: 360, M: 630, L: 920 },
  },
  {
    id: 'nvp-3',
    name: 'Chicken Golden Corn Pizza',
    category: 'Non-Veg Pizza',
    description: 'Succulent chicken bits, sweet golden corn, and molten mozzarella cheese.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    pizzaPrices: { S: 290, M: 510, L: 750 },
  },
  {
    id: 'b-5',
    name: 'Veg Maharaja Burger',
    category: 'Burgers',
    description: 'Double stacked vegetable patties with double cheese, jalapeños, onions, and rich spicy mayo.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    price: 190,
  },
  {
    id: 'b-10',
    name: 'Chicken Maharaja Burger',
    category: 'Burgers',
    description: 'Grand feast burger loaded with double chicken patties, molten cheese, crunch lettuce & tangy dressing.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    price: 230,
  },
  {
    id: 'f-4',
    name: 'Paneer Loaded Fries',
    category: 'Fries',
    description: 'Crisp fries piled high with spiced paneer cubes, melted cheese sauce, and jalapeños.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    price: 200,
  },
  {
    id: 'm-4',
    name: 'Crispy Momos',
    category: 'Momo',
    description: 'Customer favourite! Coated in special crispy crumb batter and fried ultra-crisp.',
    image: 'https://images.unsplash.com/photo-1625398407797-030a5763bf45?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    momoVariants: [
      { label: 'Veg', price: 170 },
      { label: 'Paneer', price: 200 },
      { label: 'Chicken', price: 220 },
    ],
  },
  {
    id: 'n-8',
    name: 'Chicken Chowmein',
    category: 'Chowmein / Noodles',
    description: 'Traditional Nepali street-style chicken chowmein tossed with chicken strips, veggies, and savory spices.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    price: 190,
  },
  {
    id: 'w-1',
    name: 'Paneer Tikka Wrap',
    category: 'Wraps',
    description: 'Char-grilled cottage cheese cubes rolled in soft flatbread with mint mayo and onions.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    price: 150,
  },
  {
    id: 'cfc-popular',
    name: 'Crunchy Fried Chicken',
    category: 'Crunchy Fried Chicken',
    description: 'Golden, crispy, pressure-fried chicken. Juicy on the inside with shattering crunch outside.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    chickenOptions: [
      { label: 'Wings (4 pcs)', price: 280 },
      { label: 'Boneless Strips (4 pcs)', price: 260 },
      { label: 'Mix (4 pcs)', price: 320 },
    ],
  },
  {
    id: 'mck-1',
    name: 'Mint Mojito',
    category: 'Shake & Mocktails',
    description: 'Muddled fresh mint leaves, tangy lime juice, and sparkling soda over crushed ice.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    price: 130,
  },
];

export const PopularSection: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedPizzaSizes, setSelectedPizzaSizes] = useState<Record<string, PizzaSize>>({
    'vp-1': 'M',
    'vp-6': 'M',
    'vp-21': 'M',
    'nvp-3': 'M',
  });
  const [selectedMomoVariant, setSelectedMomoVariant] = useState<Record<string, string>>({
    'm-4': 'Chicken',
  });
  const [selectedChickenOption, setSelectedChickenOption] = useState<Record<string, string>>({
    'cfc-popular': 'Wings (4 pcs)',
  });

  const handleAddPizza = (item: PopularCardProps) => {
    const size = selectedPizzaSizes[item.id] || 'M';
    const price = item.pizzaPrices ? item.pizzaPrices[size] : 420;
    addToCart({
      menuItemId: item.id,
      name: item.name,
      category: item.category as any,
      variantLabel: `Size: ${size}`,
      selectedPrice: price,
      quantity: 1,
      isVeg: item.isVeg,
      image: item.image,
    });
  };

  const handleAddMomo = (item: PopularCardProps) => {
    const chosen = selectedMomoVariant[item.id] || 'Chicken';
    const variantObj = item.momoVariants?.find((v) => v.label === chosen);
    const price = variantObj ? variantObj.price : 220;
    addToCart({
      menuItemId: item.id,
      name: item.name,
      category: item.category as any,
      variantLabel: `Variant: ${chosen}`,
      selectedPrice: price,
      quantity: 1,
      isVeg: chosen === 'Veg' || chosen === 'Paneer',
      image: item.image,
    });
  };

  const handleAddChicken = (item: PopularCardProps) => {
    const chosen = selectedChickenOption[item.id] || 'Wings (4 pcs)';
    const opt = item.chickenOptions?.find((o) => o.label === chosen);
    const price = opt ? opt.price : 280;
    addToCart({
      menuItemId: item.id,
      name: item.name,
      category: item.category as any,
      variantLabel: chosen,
      selectedPrice: price,
      quantity: 1,
      isVeg: false,
      image: item.image,
    });
  };

  const handleAddRegular = (item: PopularCardProps) => {
    addToCart({
      menuItemId: item.id,
      name: item.name,
      category: item.category as any,
      selectedPrice: item.price || 150,
      quantity: 1,
      isVeg: item.isVeg,
      image: item.image,
    });
  };

  return (
    <section id="favourites" className="py-20 bg-[#070D1E] border-t border-[#15274E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E92C2C]">
              Handcrafted Favourites
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight mt-1">
              THE CROWD <span className="text-[#FFCA28]">FAVOURITES</span>
            </h2>
            <p className="text-sm text-[#A3B3D4] mt-2 max-w-xl">
              From our famous overloaded pizzas and Maharaja burgers to authentic crispy momos,
              discover the most popular orders at Hashtag Pizza.
            </p>
          </div>

          <a
            href="#menu"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#FFCA28] hover:text-white transition-colors group"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Popular Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {POPULAR_ITEMS.map((item) => {
            const isPizza = !!item.pizzaPrices;
            const isMomo = !!item.momoVariants;
            const isChicken = !!item.chickenOptions;
            const activePizzaSize = selectedPizzaSizes[item.id] || 'M';

            let currentPrice = item.price || 0;
            if (isPizza && item.pizzaPrices) {
              currentPrice = item.pizzaPrices[activePizzaSize];
            } else if (isMomo && item.momoVariants) {
              const v = item.momoVariants.find((m) => m.label === (selectedMomoVariant[item.id] || 'Chicken'));
              currentPrice = v ? v.price : 220;
            } else if (isChicken && item.chickenOptions) {
              const opt = item.chickenOptions.find((o) => o.label === (selectedChickenOption[item.id] || 'Wings (4 pcs)'));
              currentPrice = opt ? opt.price : 280;
            }

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-xl bg-[#0B152B] border border-[#16274E] hover:border-[#1F3F7A] transition-all overflow-hidden group hover:shadow-xl hover:shadow-black/70"
              >
                {/* Image & Veg Indicator */}
                <div className="relative h-44 w-full overflow-hidden bg-[#0F1C3A]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B152B] via-transparent to-transparent opacity-80" />

                  {/* Dietary dot & category badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded bg-[#060B18]/90 border ${
                        item.isVeg ? 'border-green-500' : 'border-red-500'
                      }`}
                      title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.isVeg ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/75 text-[#A3B3D4] backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-base text-white tracking-tight leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#A3B3D4] mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Variant / Size Selectors */}
                  <div className="mt-4 pt-3 border-t border-[#142345]">
                    {/* Pizza S / M / L Size Buttons */}
                    {isPizza && item.pizzaPrices && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
                        <span className="text-[11px] font-medium text-[#A3B3D4]">Size:</span>
                        <div className="flex items-center flex-wrap gap-1">
                          {(['S', 'M', 'L'] as PizzaSize[]).map((sz) => (
                            <button
                              key={sz}
                              onClick={() =>
                                setSelectedPizzaSizes((prev) => ({ ...prev, [item.id]: sz }))
                              }
                              className={`px-2 py-1 text-[10px] sm:text-[11px] font-bold rounded transition-colors cursor-pointer ${
                                activePizzaSize === sz
                                  ? 'bg-[#E92C2C] text-white shadow-sm'
                                  : 'bg-[#101F3E] text-[#A3B3D4] hover:text-white hover:bg-[#182C58]'
                              }`}
                            >
                              {sz} (Rs.{item.pizzaPrices ? item.pizzaPrices[sz] : ''})
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Momo Variant Selector */}
                    {isMomo && item.momoVariants && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
                        <span className="text-[11px] font-medium text-[#A3B3D4]">Choice:</span>
                        <div className="flex items-center flex-wrap gap-1">
                          {item.momoVariants.map((v) => (
                            <button
                              key={v.label}
                              onClick={() =>
                                setSelectedMomoVariant((prev) => ({ ...prev, [item.id]: v.label }))
                              }
                              className={`px-2 py-1 text-[10px] font-bold rounded transition-colors cursor-pointer ${
                                (selectedMomoVariant[item.id] || 'Chicken') === v.label
                                  ? 'bg-[#FFCA28] text-black font-extrabold'
                                  : 'bg-[#101F3E] text-[#A3B3D4] hover:text-white'
                              }`}
                            >
                              {v.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Crunchy Chicken Options */}
                    {isChicken && item.chickenOptions && (
                      <div className="flex flex-wrap items-center gap-1 mb-3">
                        {item.chickenOptions.map((opt) => (
                          <button
                            key={opt.label}
                            onClick={() =>
                              setSelectedChickenOption((prev) => ({ ...prev, [item.id]: opt.label }))
                            }
                            className={`px-2 py-1 text-[10px] font-bold rounded transition-colors cursor-pointer ${
                              (selectedChickenOption[item.id] || 'Wings (4 pcs)') === opt.label
                                ? 'bg-[#E92C2C] text-white'
                                : 'bg-[#101F3E] text-[#A3B3D4] hover:text-white'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Price and Add to Order Button */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#142345]/50">
                      <div>
                        <span className="text-[10px] text-[#A3B3D4] block font-medium">Price</span>
                        <span className="font-heading font-extrabold text-base text-[#FFCA28]">
                          Rs. {currentPrice}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          if (isPizza) handleAddPizza(item);
                          else if (isMomo) handleAddMomo(item);
                          else if (isChicken) handleAddChicken(item);
                          else handleAddRegular(item);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#E92C2C] hover:bg-[#D02222] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Menu Link Banner */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0B152B] via-[#102044] to-[#0B152B] border border-[#16274E] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
          <div>
            <h4 className="font-heading font-bold text-base sm:text-lg text-white">
              Want to see our entire selection?
            </h4>
            <p className="text-xs text-[#A3B3D4] mt-0.5">
              Explore all 23 categories including Pocket Pizzas, Chowmein, Rolls, Pastas & Shakes.
            </p>
          </div>

          <a
            href="#menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-lg bg-[#FFCA28] hover:bg-[#ffbe10] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shrink-0"
          >
            <span>Explore Complete 23 Categories</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
