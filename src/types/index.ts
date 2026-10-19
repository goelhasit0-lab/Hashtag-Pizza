export type FoodCategory =
  | 'Burgers'
  | 'Fries'
  | 'Vegetarian Pizza'
  | 'Non-Veg Pizza'
  | 'Pizza Extra / Add-On'
  | 'Pocket Pizza'
  | 'Dessert'
  | 'Wraps'
  | 'Sides'
  | 'Appetizers'
  | 'Pizza Lovers'
  | 'Momo'
  | 'Chowmein / Noodles'
  | 'Sandwich'
  | 'Rolls'
  | 'Fried Rice'
  | 'Bowls Combo'
  | 'Snacks and Bread Items'
  | 'Pasta'
  | 'Egg Items'
  | 'Chicken Items'
  | 'Shake & Mocktails'
  | 'Crunchy Fried Chicken';

export type PizzaSize = 'S' | 'M' | 'L';

export interface PizzaPriceMap {
  S: number;
  M: number;
  L: number;
}

export interface MomoPriceMap {
  veg?: number;
  paneer?: number;
  chicken?: number;
}

export interface PastaPriceMap {
  veg: number;
  chicken: number;
}

export interface FriedChickenRow {
  pieces: 2 | 4 | 6 | 8 | 12;
  bonelessStrips: number;
  wings: number;
  legs: number;
  mix: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: FoodCategory;
  subcategory?: string; // e.g. 'Classic Pizza', 'Deluxe Pizza', 'Premium Pizza', 'Supreme Pizza', 'Shakes', 'Mocktails'
  description?: string;
  isVeg: boolean;
  price?: number; // For single price items
  pizzaPrices?: PizzaPriceMap; // For S, M, L pizzas
  momoPrices?: MomoPriceMap; // For Momo table items
  pastaPrices?: PastaPriceMap; // For Pasta table items
  image?: string;
  isPopular?: boolean;
  needsConfirmation?: boolean; // For items where printed menu price is marked for verification
  allowedAddons?: string[];
}

export interface CartItem {
  id: string; // Unique cart item ID (combines item id + variant + addons)
  menuItemId: string;
  name: string;
  category: FoodCategory;
  variantLabel?: string; // e.g. "Size: M", "Variant: Chicken", "Wings (4 pcs)"
  selectedPrice: number;
  quantity: number;
  selectedAddons?: { name: string; price: number }[];
  isVeg: boolean;
  image?: string;
}

export type OrderType = 'pickup' | 'delivery' | 'dine-in';

export interface OrderDetails {
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  deliveryAddress?: string;
  specialInstructions?: string;
}
