export interface ComboOffer {
  id: string;
  title: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  itemsIncluded: string[];
  description: string;
  badge?: string;
  isVerifiedOffer: boolean;
  image: string;
}

// Configurable offers based on actual menu products and verified in-store campaigns
export const COMBOS_DATA: ComboOffer[] = [
  {
    id: 'combo-everyday-meal',
    title: 'Everyday Meal Offer',
    tagline: 'Family & Friends Pizza Feast',
    price: 1000,
    itemsIncluded: [
      '4 Small Veg Pizzas (Choice from Classic & Deluxe Range)',
      'Freshly baked dough with 100% mozzarella',
      'Perfect for groups of 3-4 people',
    ],
    description: 'Our most popular verified in-store everyday special! Enjoy any four small pizzas from our Classic and Deluxe vegetarian collection.',
    badge: 'Verified Restaurant Offer',
    isVerifiedOffer: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'combo-burger-fries-shake',
    title: 'Maharaja Burger & Shake Pairing',
    tagline: 'Hearty Fast-Food Feast',
    price: 480, // Chicken Maharaja (230) + Cheesy French Fries (160) + Cold Coffee (140) = 530
    itemsIncluded: [
      '1x Chicken or Veg Maharaja Burger',
      '1x Peri-Peri or Cheesy French Fries',
      '1x Thick Milkshake or Mint Mojito',
    ],
    description: 'A curated pairing of our top-tier Maharaja Burger alongside loaded fries and a chilled beverage of your choice.',
    badge: 'Popular Pairing',
    isVerifiedOffer: false,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'combo-momo-wings-platter',
    title: 'Snack & Share Platter',
    tagline: 'Evening Hangout Special',
    price: 490,
    itemsIncluded: [
      '1x Crispy Momo (Veg, Paneer, or Chicken)',
      '4x Crunchy Fried Chicken Wings or Strips',
      '1x Mint Mojito or Blue Lagoon Mocktail',
    ],
    description: 'Crispy crunchy momos paired with golden fried chicken wings and a sparkling cool refresher.',
    badge: 'Evening Favourite',
    isVerifiedOffer: false,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
  },
];
