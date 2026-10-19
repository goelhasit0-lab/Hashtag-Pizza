import React from 'react';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-3 sm:right-6 left-3 sm:left-auto z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#0B152B] border border-[#16274E] text-white text-xs font-semibold shadow-2xl backdrop-blur-md">
        <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
          <Check className="w-3 h-3" />
        </span>
        <span className="truncate">{toastMessage}</span>
      </div>
    </div>
  );
};
