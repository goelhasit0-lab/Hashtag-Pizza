import React, { useState, useMemo } from 'react';
import { Search, X, Plus, Check, ChevronDown, ChevronUp, Sparkles, AlertCircle } from 'lucide-react';
import {
  MENU_ITEMS,
  CATEGORIES_LIST,
  CRUNCHY_FRIED_CHICKEN_TABLE,
  PIZZA_ADDONS,
} from '../data/menuData';
import { FoodCategory, MenuItem, PizzaSize } from '../types';
import { useCart } from '../context/CartContext';

export const FullMenuSection: React.FC = () => {
  const { addToCart, selectedCategory, setSelectedCategory } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [selectedPizzaSizes, setSelectedPizzaSizes] = useState<Record<string, PizzaSize>>({});
  const [selectedCrustAddon, setSelectedCrustAddon] = useState<Record<string, string>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    Burgers: true,
    Fries: true,
    'Vegetarian Pizza': true,
    'Non-Veg Pizza': true,
    Momo: true,
    'Chowmein / Noodles': true,
    Pasta: true,
    'Crunchy Fried Chicken': true,
  });

  // Toggle category collapse
  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Diet filter
      if (dietFilter === 'veg' && !item.isVeg) return false;
      if (dietFilter === 'non-veg' && item.isVeg) return false;
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        const matchSub = item.subcategory?.toLowerCase().includes(query);
        const matchDesc = item.description?.toLowerCase().includes(query);
        return matchName || matchCategory || matchSub || matchDesc;
      }
      return true;
    });
  }, [selectedCategory, dietFilter, searchQuery]);

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups: Partial<Record<FoodCategory, MenuItem[]>> = {};
    for (const item of filteredItems) {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category]!.push(item);
    }
    return groups;
  }, [filteredItems]);

  // Quick Add for Standard Single-Price Item
  const handleAddSimple = (item: MenuItem) => {
    addToCart({
      menuItemId: item.id,
      name: item.name,
      category: item.category,
      selectedPrice: item.price || 150,
      quantity: 1,
      isVeg: item.isVeg,
      image: item.image,
    });
  };

  // Add Pizza with selected size & optional crust addon
  const handleAddPizza = (item: MenuItem) => {
    const size = selectedPizzaSizes[item.id] || 'M';
    const basePrice = item.pizzaPrices ? item.pizzaPrices[size] : 420;

    let selectedAddonsList: { name: string; price: number }[] | undefined = undefined;
    const chosenAddonName = selectedCrustAddon[item.id];
    if (chosenAddonName && chosenAddonName !== 'none') {
      const addonDef = PIZZA_ADDONS.find((a) => a.name === chosenAddonName);
      if (addonDef) {
        const addonPrice =
          size === 'S'
            ? addonDef.priceSmall
            : size === 'M'
            ? addonDef.priceMedium
            : addonDef.priceLarge;
        selectedAddonsList = [{ name: `${addonDef.name} (${size})`, price: addonPrice }];
      }
    }

    addToCart({
      menuItemId: item.id,
      name: item.name,
      category: item.category,
      variantLabel: `Size: ${size}`,
      selectedPrice: basePrice,
      quantity: 1,
      selectedAddons: selectedAddonsList,
      isVeg: item.isVeg,
      image: item.image,
    });
  };

  // Add Momo variant
  const handleAddMomoVariant = (item: MenuItem, variant: 'Veg' | 'Paneer' | 'Chicken', price: number) => {
    addToCart({
      menuItemId: item.id,
      name: item.name,
      category: 'Momo',
      variantLabel: `${variant} Momo`,
      selectedPrice: price,
      quantity: 1,
      isVeg: variant !== 'Chicken',
      image: item.image,
    });
  };

  // Add Pasta variant
  const handleAddPastaVariant = (item: MenuItem, variant: 'Veg' | 'Chicken', price: number) => {
    addToCart({
      menuItemId: item.id,
      name: item.name,
      category: 'Pasta',
      variantLabel: `${variant} Pasta`,
      selectedPrice: price,
      quantity: 1,
      isVeg: variant === 'Veg',
      image: item.image,
    });
  };

  // Add Fried Chicken Row variant
  const handleAddFriedChicken = (pieces: number, typeLabel: string, price: number) => {
    addToCart({
      menuItemId: `cfc-${pieces}-${typeLabel}`,
      name: `Crunchy Fried Chicken (${pieces} pcs)`,
      category: 'Crunchy Fried Chicken',
      variantLabel: `${typeLabel} (${pieces} Pieces)`,
      selectedPrice: price,
      quantity: 1,
      isVeg: false,
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
    });
  };

  return (
    <section id="menu" className="py-20 bg-[#060B18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFCA28]">
            Authoritative In-Store Menu
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mt-1">
            COMPLETE <span className="text-[#FFCA28]">DIGITAL MENU</span>
          </h2>
          <p className="text-sm text-[#A3B3D4] mt-3">
            Every category, variant, and exact price from the original Hashtag Pizza menu.
            Select your preferred size or spice variant and customize your order.
          </p>
        </div>

        {/* Search & Dietary Filters Bar */}
        <div className="bg-[#0B152B] border border-[#16274E] rounded-2xl p-3.5 sm:p-5 mb-8 shadow-xl max-w-full overflow-hidden">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-[#A3B3D4] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pizzas, momos, burgers, rolls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#060B18] border border-[#1A3166] text-white text-sm placeholder-[#667EA6] focus:outline-none focus:border-[#E92C2C] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A3B3D4] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Pure Veg / Non-Veg Filter (Segmented control) */}
            <div className="flex items-center gap-1.5 p-1 bg-[#060B18] rounded-xl border border-[#16274E] w-full md:w-auto">
              <button
                onClick={() => setDietFilter('all')}
                className={`flex-1 md:flex-initial px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  dietFilter === 'all'
                    ? 'bg-[#122347] text-white shadow-sm'
                    : 'text-[#A3B3D4] hover:text-white'
                }`}
              >
                All Items
              </button>
              <button
                onClick={() => setDietFilter('veg')}
                className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  dietFilter === 'veg'
                    ? 'bg-green-950/80 border border-green-600/60 text-green-300'
                    : 'text-[#A3B3D4] hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>Veg Only</span>
              </button>
              <button
                onClick={() => setDietFilter('non-veg')}
                className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  dietFilter === 'non-veg'
                    ? 'bg-red-950/80 border border-red-600/60 text-red-300'
                    : 'text-[#A3B3D4] hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>Non-Veg Only</span>
              </button>
            </div>
          </div>

          {/* Category Chips (Horizontal Scrollable) */}
          <div className="mt-4 pt-4 border-t border-[#15274E] flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin max-w-full">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#E92C2C] text-white shadow'
                  : 'bg-[#0E1A36] text-[#A3B3D4] hover:text-white hover:bg-[#16274E]'
              }`}
            >
              All Categories ({MENU_ITEMS.length})
            </button>
            {CATEGORIES_LIST.map((cat) => {
              const count = MENU_ITEMS.filter((i) => i.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#E92C2C] text-white font-bold shadow'
                      : 'bg-[#0E1A36] text-[#A3B3D4] hover:text-white hover:bg-[#16274E]'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty Search Result State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 px-4 bg-[#0B152B] rounded-2xl border border-[#16274E]">
            <AlertCircle className="w-12 h-12 text-[#FFCA28] mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-white">No menu items found</h3>
            <p className="text-xs text-[#A3B3D4] mt-1 max-w-sm mx-auto">
              We couldn't find any dishes matching "{searchQuery}". Try searching for another
              favourite or clear filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietFilter('all');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold bg-[#242424] hover:bg-[#333333] text-white rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Display Categories */}
        <div className="space-y-12">
          {CATEGORIES_LIST.map((category) => {
            const items = groupedItems[category];
            if (!items || items.length === 0) return null;

            const isExpanded = expandedCategories[category] ?? true;

            return (
              <div
                key={category}
                id={`cat-${category.replace(/\s+/g, '-').toLowerCase()}`}
                className="scroll-mt-24"
              >
                {/* Category Header Bar with Collapse Toggle */}
                <div
                  onClick={() => toggleCategory(category)}
                  className="flex items-center justify-between p-4 rounded-xl bg-[#0B152B] border border-[#16274E] hover:border-[#1F3F7A] transition-colors cursor-pointer select-none mb-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E92C2C]" />
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white tracking-tight">
                      {category}
                    </h3>
                    <span className="text-xs text-[#A3B3D4] font-normal">
                      ({items.length} items)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#A3B3D4]">
                    <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Category Content when Expanded */}
                {isExpanded && (
                  <div>
                    {/* SPECIAL CASE 1: MOMO SECTION (Responsive Mobile Cards + Desktop Matrix) */}
                    {category === 'Momo' ? (
                      <div className="rounded-xl overflow-hidden border border-[#16274E] bg-[#091224] mb-6 shadow-lg">
                        <div className="p-4 bg-[#0D1936] border-b border-[#16274E] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div>
                            <span className="text-xs text-[#FFCA28] font-bold uppercase tracking-wider">
                              Signature Nepali Dumplings
                            </span>
                            <p className="text-xs text-[#A3B3D4] mt-0.5">
                              Steamed, fried, crispy, kothey, or tandoori. Select your preferred style & filling.
                            </p>
                          </div>
                          <span className="text-[10px] text-white/50 uppercase tracking-widest hidden sm:inline-block">
                            10 Pcs / Portion
                          </span>
                        </div>

                        {/* MOBILE VIEW (< md): 100% Full-Width Responsive Cards with Zero Horizontal Overflow */}
                        <div className="block md:hidden p-3 space-y-3">
                          {items.map((momo) => (
                            <div
                              key={momo.id}
                              className="p-3.5 rounded-xl bg-[#0B152B] border border-[#16274E] space-y-2.5"
                            >
                              <div>
                                <h4 className="font-heading font-bold text-sm text-white">
                                  {momo.name}
                                </h4>
                                {momo.description && (
                                  <p className="text-[11px] text-[#A3B3D4] line-clamp-2 mt-0.5 leading-snug">
                                    {momo.description}
                                  </p>
                                )}
                              </div>

                              {/* 3-Variant Button Grid - Cleanly fits all mobile screens */}
                              <div className="grid grid-cols-3 gap-2 w-full pt-2 border-t border-[#132247]">
                                {/* Veg */}
                                {momo.momoPrices?.veg ? (
                                  <button
                                    onClick={() =>
                                      handleAddMomoVariant(momo, 'Veg', momo.momoPrices!.veg!)
                                    }
                                    className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-[#0E1A36] border border-green-800/40 hover:bg-green-950 text-white font-bold transition-all active:scale-95 cursor-pointer"
                                  >
                                    <span className="text-[10px] text-green-400 font-semibold uppercase">Veg</span>
                                    <span className="text-xs font-extrabold text-white mt-0.5">
                                      Rs. {momo.momoPrices.veg}
                                    </span>
                                    <span className="text-[9px] text-green-400 font-medium mt-0.5 flex items-center gap-0.5">
                                      <Plus className="w-2.5 h-2.5" /> Add
                                    </span>
                                  </button>
                                ) : (
                                  <div className="flex items-center justify-center text-xs text-[#555]">—</div>
                                )}

                                {/* Paneer */}
                                {momo.momoPrices?.paneer ? (
                                  <button
                                    onClick={() =>
                                      handleAddMomoVariant(momo, 'Paneer', momo.momoPrices!.paneer!)
                                    }
                                    className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-[#0E1A36] border border-yellow-800/40 hover:bg-yellow-950 text-white font-bold transition-all active:scale-95 cursor-pointer"
                                  >
                                    <span className="text-[10px] text-[#FFCA28] font-semibold uppercase">Paneer</span>
                                    <span className="text-xs font-extrabold text-white mt-0.5">
                                      Rs. {momo.momoPrices.paneer}
                                    </span>
                                    <span className="text-[9px] text-[#FFCA28] font-medium mt-0.5 flex items-center gap-0.5">
                                      <Plus className="w-2.5 h-2.5" /> Add
                                    </span>
                                  </button>
                                ) : (
                                  <div className="flex items-center justify-center text-xs text-[#555]">—</div>
                                )}

                                {/* Chicken */}
                                {momo.momoPrices?.chicken ? (
                                  <button
                                    onClick={() =>
                                      handleAddMomoVariant(momo, 'Chicken', momo.momoPrices!.chicken!)
                                    }
                                    className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-[#0E1A36] border border-red-800/40 hover:bg-red-950 text-white font-bold transition-all active:scale-95 cursor-pointer"
                                  >
                                    <span className="text-[10px] text-red-400 font-semibold uppercase">Chicken</span>
                                    <span className="text-xs font-extrabold text-white mt-0.5">
                                      Rs. {momo.momoPrices.chicken}
                                    </span>
                                    <span className="text-[9px] text-red-400 font-medium mt-0.5 flex items-center gap-0.5">
                                      <Plus className="w-2.5 h-2.5" /> Add
                                    </span>
                                  </button>
                                ) : (
                                  <div className="flex items-center justify-center text-xs text-[#555]">—</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* DESKTOP VIEW (>= md): Elegant Full Table */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-[#102042] text-white border-b border-[#16274E]">
                                <th className="py-3 px-4 font-heading font-bold">Momo Style</th>
                                <th className="py-3 px-4 font-heading font-bold text-center text-green-400">
                                  Veg (Rs.)
                                </th>
                                <th className="py-3 px-4 font-heading font-bold text-center text-yellow-400">
                                  Paneer (Rs.)
                                </th>
                                <th className="py-3 px-4 font-heading font-bold text-center text-red-400">
                                  Chicken (Rs.)
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#132247]">
                              {items.map((momo) => (
                                <tr key={momo.id} className="hover:bg-[#0E1B38] transition-colors">
                                  <td className="py-3.5 px-4">
                                    <div className="font-heading font-bold text-white text-sm">
                                      {momo.name}
                                    </div>
                                    <div className="text-[11px] text-[#A3B3D4] line-clamp-1 mt-0.5">
                                      {momo.description}
                                    </div>
                                  </td>

                                  {/* Veg Column */}
                                  <td className="py-3.5 px-4 text-center">
                                    {momo.momoPrices?.veg ? (
                                      <button
                                        onClick={() =>
                                          handleAddMomoVariant(momo, 'Veg', momo.momoPrices!.veg!)
                                        }
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101F3E] hover:bg-green-700 text-white font-bold transition-all shadow-sm cursor-pointer"
                                        title={`Add Veg ${momo.name}`}
                                      >
                                        <span>Rs. {momo.momoPrices.veg}</span>
                                        <Plus className="w-3 h-3 text-green-400" />
                                      </button>
                                    ) : (
                                      <span className="text-[#555]">—</span>
                                    )}
                                  </td>

                                  {/* Paneer Column */}
                                  <td className="py-3.5 px-4 text-center">
                                    {momo.momoPrices?.paneer ? (
                                      <button
                                        onClick={() =>
                                          handleAddMomoVariant(
                                            momo,
                                            'Paneer',
                                            momo.momoPrices!.paneer!
                                          )
                                        }
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101F3E] hover:bg-yellow-700 text-white font-bold transition-all shadow-sm cursor-pointer"
                                        title={`Add Paneer ${momo.name}`}
                                      >
                                        <span>Rs. {momo.momoPrices.paneer}</span>
                                        <Plus className="w-3 h-3 text-yellow-400" />
                                      </button>
                                    ) : (
                                      <span className="text-[#555]">—</span>
                                    )}
                                  </td>

                                  {/* Chicken Column */}
                                  <td className="py-3.5 px-4 text-center">
                                    {momo.momoPrices?.chicken ? (
                                      <button
                                        onClick={() =>
                                          handleAddMomoVariant(
                                            momo,
                                            'Chicken',
                                            momo.momoPrices!.chicken!
                                          )
                                        }
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101F3E] hover:bg-red-700 text-white font-bold transition-all shadow-sm cursor-pointer"
                                        title={`Add Chicken ${momo.name}`}
                                      >
                                        <span>Rs. {momo.momoPrices.chicken}</span>
                                        <Plus className="w-3 h-3 text-red-400" />
                                      </button>
                                    ) : (
                                      <span className="text-[#555]">—</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : null}

                    {/* SPECIAL CASE 2: PASTA SECTION (Responsive Mobile Cards + Desktop Matrix) */}
                    {category === 'Pasta' ? (
                      <div className="rounded-xl overflow-hidden border border-[#16274E] bg-[#091224] mb-6 shadow-lg">
                        <div className="p-4 bg-[#0D1936] border-b border-[#16274E]">
                          <span className="text-xs text-[#FFCA28] font-bold uppercase tracking-wider">
                            Italian Baked & Cheesy Pastas
                          </span>
                          <p className="text-xs text-[#A3B3D4] mt-0.5">
                            Prepared with authentic sauces and topped with molten cheese.
                          </p>
                        </div>

                        {/* MOBILE VIEW (< md) */}
                        <div className="block md:hidden p-3 space-y-3">
                          {items.map((pasta) => (
                            <div
                              key={pasta.id}
                              className="p-3.5 rounded-xl bg-[#0B152B] border border-[#16274E] space-y-2.5"
                            >
                              <div>
                                <h4 className="font-heading font-bold text-sm text-white">
                                  {pasta.name}
                                </h4>
                                {pasta.description && (
                                  <p className="text-[11px] text-[#A3B3D4] line-clamp-2 mt-0.5 leading-snug">
                                    {pasta.description}
                                  </p>
                                )}
                              </div>

                              <div className="grid grid-cols-2 gap-2 w-full pt-2 border-t border-[#132247]">
                                {pasta.pastaPrices?.veg ? (
                                  <button
                                    onClick={() =>
                                      handleAddPastaVariant(
                                        pasta,
                                        'Veg',
                                        pasta.pastaPrices!.veg
                                      )
                                    }
                                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#0E1A36] border border-green-800/40 hover:bg-green-950 text-white font-bold transition-all active:scale-95 cursor-pointer"
                                  >
                                    <span className="text-[11px] text-green-400 font-semibold">Veg</span>
                                    <span className="text-xs font-extrabold flex items-center gap-1">
                                      Rs. {pasta.pastaPrices.veg}
                                      <Plus className="w-3 h-3 text-green-400" />
                                    </span>
                                  </button>
                                ) : null}

                                {pasta.pastaPrices?.chicken ? (
                                  <button
                                    onClick={() =>
                                      handleAddPastaVariant(
                                        pasta,
                                        'Chicken',
                                        pasta.pastaPrices!.chicken
                                      )
                                    }
                                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#0E1A36] border border-red-800/40 hover:bg-red-950 text-white font-bold transition-all active:scale-95 cursor-pointer"
                                  >
                                    <span className="text-[11px] text-red-400 font-semibold">Chicken</span>
                                    <span className="text-xs font-extrabold flex items-center gap-1">
                                      Rs. {pasta.pastaPrices.chicken}
                                      <Plus className="w-3 h-3 text-red-400" />
                                    </span>
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* DESKTOP VIEW (>= md) */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-[#102042] text-white border-b border-[#16274E]">
                                <th className="py-3 px-4 font-heading font-bold">Pasta Recipe</th>
                                <th className="py-3 px-4 font-heading font-bold text-center text-green-400">
                                  Vegetarian (Rs.)
                                </th>
                                <th className="py-3 px-4 font-heading font-bold text-center text-red-400">
                                  Chicken (Rs.)
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#132247]">
                              {items.map((pasta) => (
                                <tr key={pasta.id} className="hover:bg-[#0E1B38] transition-colors">
                                  <td className="py-3.5 px-4">
                                    <div className="font-heading font-bold text-white text-sm">
                                      {pasta.name}
                                    </div>
                                    <div className="text-[11px] text-[#A3B3D4] line-clamp-1 mt-0.5">
                                      {pasta.description}
                                    </div>
                                  </td>

                                  <td className="py-3.5 px-4 text-center">
                                    {pasta.pastaPrices?.veg ? (
                                      <button
                                        onClick={() =>
                                          handleAddPastaVariant(
                                            pasta,
                                            'Veg',
                                            pasta.pastaPrices!.veg
                                          )
                                        }
                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#101F3E] hover:bg-green-700 text-white font-bold transition-all shadow-sm cursor-pointer"
                                      >
                                        <span>Rs. {pasta.pastaPrices.veg}</span>
                                        <Plus className="w-3 h-3 text-green-400" />
                                      </button>
                                    ) : (
                                      <span className="text-[#555]">—</span>
                                    )}
                                  </td>

                                  <td className="py-3.5 px-4 text-center">
                                    {pasta.pastaPrices?.chicken ? (
                                      <button
                                        onClick={() =>
                                          handleAddPastaVariant(
                                            pasta,
                                            'Chicken',
                                            pasta.pastaPrices!.chicken
                                          )
                                        }
                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#101F3E] hover:bg-red-700 text-white font-bold transition-all shadow-sm cursor-pointer"
                                      >
                                        <span>Rs. {pasta.pastaPrices.chicken}</span>
                                        <Plus className="w-3 h-3 text-red-400" />
                                      </button>
                                    ) : (
                                      <span className="text-[#555]">—</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : null}

                    {/* SPECIAL CASE 3: CRUNCHY FRIED CHICKEN SECTION (Responsive Mobile Cards + Desktop Matrix) */}
                    {category === 'Crunchy Fried Chicken' ? (
                      <div className="rounded-xl overflow-hidden border border-[#16274E] bg-[#091224] mb-6 shadow-lg">
                        <div className="p-4 bg-[#0D1936] border-b border-[#16274E]">
                          <span className="text-xs text-[#E92C2C] font-bold uppercase tracking-wider">
                            Crunchy Fried Chicken Price Matrix
                          </span>
                          <p className="text-xs text-[#A3B3D4] mt-0.5">
                            Crispy fried chicken portions with exact pieces, cuts, and prices.
                          </p>
                        </div>

                        {/* MOBILE VIEW (< md) */}
                        <div className="block md:hidden p-3 space-y-3">
                          {CRUNCHY_FRIED_CHICKEN_TABLE.map((row) => (
                            <div
                              key={row.pieces}
                              className="p-3.5 rounded-xl bg-[#0B152B] border border-[#16274E]"
                            >
                              <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[#132247]">
                                <span className="font-heading font-extrabold text-sm text-[#FFCA28]">
                                  {row.pieces} Pieces Platter
                                </span>
                                <span className="text-[10px] text-[#A3B3D4] uppercase tracking-wider font-semibold">
                                  Select Cut
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  onClick={() =>
                                    handleAddFriedChicken(
                                      row.pieces,
                                      'Boneless Strips',
                                      row.bonelessStrips
                                    )
                                  }
                                  className="flex flex-col items-start p-2 rounded-lg bg-[#0E1A36] border border-[#182C58] hover:border-[#E92C2C] text-left transition-all active:scale-95 cursor-pointer"
                                >
                                  <span className="text-[10px] text-[#A3B3D4]">Boneless Strips</span>
                                  <div className="flex items-center justify-between w-full mt-0.5">
                                    <span className="text-xs font-bold text-white">Rs. {row.bonelessStrips}</span>
                                    <Plus className="w-3 h-3 text-[#FFCA28]" />
                                  </div>
                                </button>

                                <button
                                  onClick={() =>
                                    handleAddFriedChicken(row.pieces, 'Wings', row.wings)
                                  }
                                  className="flex flex-col items-start p-2 rounded-lg bg-[#0E1A36] border border-[#182C58] hover:border-[#E92C2C] text-left transition-all active:scale-95 cursor-pointer"
                                >
                                  <span className="text-[10px] text-[#A3B3D4]">Wings</span>
                                  <div className="flex items-center justify-between w-full mt-0.5">
                                    <span className="text-xs font-bold text-white">Rs. {row.wings}</span>
                                    <Plus className="w-3 h-3 text-[#FFCA28]" />
                                  </div>
                                </button>

                                <button
                                  onClick={() =>
                                    handleAddFriedChicken(row.pieces, 'Legs', row.legs)
                                  }
                                  className="flex flex-col items-start p-2 rounded-lg bg-[#0E1A36] border border-[#182C58] hover:border-[#E92C2C] text-left transition-all active:scale-95 cursor-pointer"
                                >
                                  <span className="text-[10px] text-[#A3B3D4]">Legs</span>
                                  <div className="flex items-center justify-between w-full mt-0.5">
                                    <span className="text-xs font-bold text-white">Rs. {row.legs}</span>
                                    <Plus className="w-3 h-3 text-[#FFCA28]" />
                                  </div>
                                </button>

                                <button
                                  onClick={() =>
                                    handleAddFriedChicken(row.pieces, 'Mix', row.mix)
                                  }
                                  className="flex flex-col items-start p-2 rounded-lg bg-[#14264E] border border-[#FFCA28]/30 hover:border-[#FFCA28] text-left transition-all active:scale-95 cursor-pointer"
                                >
                                  <span className="text-[10px] text-[#FFCA28]">Chef's Mix</span>
                                  <div className="flex items-center justify-between w-full mt-0.5">
                                    <span className="text-xs font-bold text-white">Rs. {row.mix}</span>
                                    <Plus className="w-3 h-3 text-[#FFCA28]" />
                                  </div>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* DESKTOP VIEW (>= md) */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-[#102042] text-white border-b border-[#16274E]">
                                <th className="py-3 px-4 font-heading font-bold text-center">
                                  Pieces
                                </th>
                                <th className="py-3 px-4 font-heading font-bold text-center">
                                  Boneless Strips (Rs.)
                                </th>
                                <th className="py-3 px-4 font-heading font-bold text-center">
                                  Wings (Rs.)
                                </th>
                                <th className="py-3 px-4 font-heading font-bold text-center">
                                  Legs (Rs.)
                                </th>
                                <th className="py-3 px-4 font-heading font-bold text-center text-[#FFCA28]">
                                  Mix (Rs.)
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#132247]">
                              {CRUNCHY_FRIED_CHICKEN_TABLE.map((row) => (
                                <tr key={row.pieces} className="hover:bg-[#0E1B38] transition-colors">
                                  <td className="py-3.5 px-4 text-center font-heading font-extrabold text-sm text-[#FFCA28]">
                                    {row.pieces} PCS
                                  </td>

                                  <td className="py-3.5 px-4 text-center">
                                    <button
                                      onClick={() =>
                                        handleAddFriedChicken(
                                          row.pieces,
                                          'Boneless Strips',
                                          row.bonelessStrips
                                        )
                                      }
                                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#101F3E] hover:bg-[#E92C2C] text-white font-bold transition-all shadow-sm cursor-pointer"
                                    >
                                      <span>Rs. {row.bonelessStrips}</span>
                                      <Plus className="w-3 h-3 text-[#FFCA28]" />
                                    </button>
                                  </td>

                                  <td className="py-3.5 px-4 text-center">
                                    <button
                                      onClick={() =>
                                        handleAddFriedChicken(row.pieces, 'Wings', row.wings)
                                      }
                                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#101F3E] hover:bg-[#E92C2C] text-white font-bold transition-all shadow-sm cursor-pointer"
                                    >
                                      <span>Rs. {row.wings}</span>
                                      <Plus className="w-3 h-3 text-[#FFCA28]" />
                                    </button>
                                  </td>

                                  <td className="py-3.5 px-4 text-center">
                                    <button
                                      onClick={() =>
                                        handleAddFriedChicken(row.pieces, 'Legs', row.legs)
                                      }
                                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#101F3E] hover:bg-[#E92C2C] text-white font-bold transition-all shadow-sm cursor-pointer"
                                    >
                                      <span>Rs. {row.legs}</span>
                                      <Plus className="w-3 h-3 text-[#FFCA28]" />
                                    </button>
                                  </td>

                                  <td className="py-3.5 px-4 text-center">
                                    <button
                                      onClick={() =>
                                        handleAddFriedChicken(row.pieces, 'Mix', row.mix)
                                      }
                                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#14264E] hover:bg-[#FFCA28] hover:text-black text-white font-bold transition-all shadow-sm cursor-pointer"
                                    >
                                      <span>Rs. {row.mix}</span>
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : null}

                    {/* GENERAL GRID FOR ALL STANDARD CATEGORIES (Burgers, Fries, Pizzas, Rolls, etc.) */}
                    {category !== 'Momo' &&
                    category !== 'Pasta' &&
                    category !== 'Crunchy Fried Chicken' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {items.map((item) => {
                          const isPizza = !!item.pizzaPrices;
                          const activeSize = selectedPizzaSizes[item.id] || 'M';
                          const chosenAddon = selectedCrustAddon[item.id] || 'none';

                          let displayPrice = item.price || 0;
                          let addonPrice = 0;

                          if (isPizza && item.pizzaPrices) {
                            displayPrice = item.pizzaPrices[activeSize];
                            if (chosenAddon !== 'none') {
                              const found = PIZZA_ADDONS.find((a) => a.name === chosenAddon);
                              if (found) {
                                addonPrice =
                                  activeSize === 'S'
                                    ? found.priceSmall
                                    : activeSize === 'M'
                                    ? found.priceMedium
                                    : found.priceLarge;
                              }
                            }
                          }

                          return (
                            <div
                              key={item.id}
                              className="flex flex-col justify-between p-4 rounded-xl bg-[#0B152B] border border-[#16274E] hover:border-[#1F3F7A] transition-all hover:bg-[#0E1A34]"
                            >
                              <div>
                                {/* Header: Veg/Non-veg & Subcategory */}
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`inline-flex items-center justify-center w-4 h-4 rounded bg-[#060B18] border ${
                                        item.isVeg ? 'border-green-500' : 'border-red-500'
                                      }`}
                                      title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                                    >
                                      <span
                                        className={`w-1.5 h-1.5 rounded-full ${
                                          item.isVeg ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                      />
                                    </span>
                                    {item.subcategory && (
                                      <span className="text-[10px] font-semibold text-[#FFCA28] uppercase tracking-wider">
                                        {item.subcategory}
                                      </span>
                                    )}
                                  </div>

                                  {item.isPopular && (
                                    <span className="inline-flex items-center gap-1 text-[10px] text-[#E92C2C] font-semibold">
                                      <Sparkles className="w-3 h-3" />
                                      <span>Popular</span>
                                    </span>
                                  )}
                                </div>

                                {/* Title & Description */}
                                <h4 className="font-heading font-bold text-base text-white tracking-tight leading-snug">
                                  {item.name}
                                </h4>
                                {item.description && (
                                  <p className="text-xs text-[#A3B3D4] mt-1 line-clamp-2 leading-relaxed">
                                    {item.description}
                                  </p>
                                )}
                              </div>

                              {/* Interactive Size Selectors for Pizzas */}
                              {isPizza && item.pizzaPrices && (
                                <div className="mt-4 pt-3 border-t border-[#142345] space-y-2.5">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                                    <span className="text-[11px] text-[#A3B3D4] font-medium">
                                      Size:
                                    </span>
                                    <div className="flex items-center flex-wrap gap-1">
                                      {(['S', 'M', 'L'] as PizzaSize[]).map((sz) => (
                                        <button
                                          key={sz}
                                          onClick={() =>
                                            setSelectedPizzaSizes((prev) => ({
                                              ...prev,
                                              [item.id]: sz,
                                            }))
                                          }
                                          className={`px-2 py-1 text-[10px] sm:text-[11px] font-bold rounded transition-colors cursor-pointer ${
                                            activeSize === sz
                                              ? 'bg-[#E92C2C] text-white shadow-sm'
                                              : 'bg-[#101F3E] text-[#A3B3D4] hover:text-white hover:bg-[#182C58]'
                                          }`}
                                        >
                                          {sz}: Rs.{item.pizzaPrices![sz]}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Optional Crust Add-on for Pizzas */}
                                  <div className="flex items-center justify-between gap-2 text-[11px]">
                                    <span className="text-[#8B9DBF] shrink-0">Crust:</span>
                                    <select
                                      value={chosenAddon}
                                      onChange={(e) =>
                                        setSelectedCrustAddon((prev) => ({
                                          ...prev,
                                          [item.id]: e.target.value,
                                        }))
                                      }
                                      className="bg-[#101F3E] text-[#A3B3D4] text-[10px] rounded px-2 py-1 border border-[#16274E] focus:outline-none focus:border-[#E92C2C] max-w-[170px] truncate"
                                    >
                                      <option value="none">Standard Crust</option>
                                      {PIZZA_ADDONS.map((a) => {
                                        const p =
                                          activeSize === 'S'
                                            ? a.priceSmall
                                            : activeSize === 'M'
                                            ? a.priceMedium
                                            : a.priceLarge;
                                        return (
                                          <option key={a.name} value={a.name}>
                                            + {a.name} (+Rs.{p})
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>
                              )}

                              {/* Card Bottom: Price and Add Button */}
                              <div className="mt-4 pt-3 border-t border-[#142345] flex items-center justify-between">
                                <div>
                                  <span className="text-[10px] text-[#8B9DBF] block">Price</span>
                                  <span className="font-heading font-extrabold text-base text-[#FFCA28]">
                                    Rs. {displayPrice + addonPrice}
                                  </span>
                                </div>

                                <button
                                  onClick={() => {
                                    if (isPizza) handleAddPizza(item);
                                    else handleAddSimple(item);
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E92C2C] hover:bg-[#D02222] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Add</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
