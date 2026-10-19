import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, FoodCategory } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedCategory: FoodCategory | 'All';
  setSelectedCategory: (cat: FoodCategory | 'All') => void;
  activeItemForModal: MenuItem | null;
  setActiveItemForModal: (item: MenuItem | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hashtag_pizza_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'All'>('All');
  const [activeItemForModal, setActiveItemForModal] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('hashtag_pizza_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2500);
  };

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const addonsKey = newItem.selectedAddons
      ? newItem.selectedAddons.map((a) => a.name).sort().join(',')
      : '';
    const uniqueId = `${newItem.menuItemId}-${newItem.variantLabel || 'default'}-${addonsKey}`;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      } else {
        return [...prevItems, { ...newItem, id: uniqueId }];
      }
    });

    showToast(`Added ${newItem.name} to order`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce((sum, item) => {
    const addonsTotal = item.selectedAddons
      ? item.selectedAddons.reduce((aSum, a) => aSum + a.price, 0)
      : 0;
    return sum + (item.selectedPrice + addonsTotal) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        selectedCategory,
        setSelectedCategory,
        activeItemForModal,
        setActiveItemForModal,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
