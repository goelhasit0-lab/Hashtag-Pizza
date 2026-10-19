import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Send,
  Phone,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { restaurantInfo } from '../data/restaurantInfo';
import { OrderType } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItems,
  } = useCart();

  const [step, setStep] = useState<'review' | 'details' | 'success'>('review');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleProceedToDetails = () => {
    if (cartItems.length === 0) return;
    setStep('details');
  };

  const handleGenerateWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!customerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 8) {
      setFormError('Please enter a valid phone number so the restaurant can contact you.');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setFormError('Please enter your delivery address in Birgunj.');
      return;
    }

    // Build formatted message
    let message = `*NEW ORDER - HASHTAG PIZZA*\n`;
    message += `--------------------------------\n`;
    message += `*Customer:* ${customerName.trim()}\n`;
    message += `*Phone:* ${customerPhone.trim()}\n`;
    message += `*Order Type:* ${orderType.toUpperCase()}\n`;
    if (orderType === 'delivery') {
      message += `*Delivery Address:* ${deliveryAddress.trim()}\n`;
    }
    if (specialInstructions.trim()) {
      message += `*Notes:* ${specialInstructions.trim()}\n`;
    }
    message += `--------------------------------\n`;
    message += `*ITEMS ORDERED:*\n`;

    cartItems.forEach((item, index) => {
      const addonsText = item.selectedAddons && item.selectedAddons.length > 0
        ? ` (+ ${item.selectedAddons.map((a) => a.name).join(', ')})`
        : '';
      const variantText = item.variantLabel ? ` [${item.variantLabel}]` : '';
      const unitTotal =
        item.selectedPrice +
        (item.selectedAddons ? item.selectedAddons.reduce((s, a) => s + a.price, 0) : 0);
      const lineTotal = unitTotal * item.quantity;

      message += `${index + 1}. ${item.name}${variantText}${addonsText}\n`;
      message += `   Qty: ${item.quantity} x Rs. ${unitTotal} = Rs. ${lineTotal}\n`;
    });

    message += `--------------------------------\n`;
    message += `*Subtotal:* Rs. ${subtotal}\n`;
    message += `*(Delivery charges & availability to be confirmed by restaurant)*\n`;
    message += `--------------------------------\n`;
    message += `Thank you! Sent via Hashtag Pizza Web Menu.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${restaurantInfo.whatsapp.number}?text=${encodedMessage}`;

    // Open WhatsApp safely with fallback
    try {
      const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!win) {
        window.location.href = whatsappUrl;
      }
    } catch {
      window.location.href = whatsappUrl;
    }
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-lg bg-[#060B18] border-l border-[#16274E] h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-300 max-w-full overflow-x-hidden">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#16274E] flex items-center justify-between bg-[#0B152B]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E92C2C]" />
            <h3 className="font-heading font-bold text-lg text-white">Your Order</h3>
            {totalItems > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#101F3E] text-[#FFCA28] border border-[#16274E]">
                {totalItems} items
              </span>
            )}
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-[#A3B3D4] hover:text-white hover:bg-[#101F3E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: REVIEW ITEMS */}
        {step === 'review' && (
          <div className="flex-1 overflow-y-auto p-5 flex flex-col">
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#0B152B] border border-[#16274E] flex items-center justify-center text-[#FFCA28] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-bold text-lg text-white">Your cart is empty</h4>
                <p className="text-xs text-[#A3B3D4] mt-1 max-w-xs">
                  Looks like you haven't added anything yet. Explore our mouthwatering pizzas,
                  burgers, momos, and drinks!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-lg bg-[#E92C2C] hover:bg-[#D02222] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between text-xs text-[#A3B3D4] pb-1 border-b border-[#132247]">
                  <span>Item Summary</span>
                  <button
                    onClick={clearCart}
                    className="text-[#E92C2C] hover:underline cursor-pointer font-medium"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-[#132247]">
                  {cartItems.map((item) => {
                    const unitPrice =
                      item.selectedPrice +
                      (item.selectedAddons
                        ? item.selectedAddons.reduce((sum, a) => sum + a.price, 0)
                        : 0);

                    return (
                      <div key={item.id} className="py-3 flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                item.isVeg ? 'bg-green-500' : 'bg-red-500'
                              }`}
                            />
                            <h5 className="font-heading font-bold text-sm text-white truncate">
                              {item.name}
                            </h5>
                          </div>

                          {item.variantLabel && (
                            <p className="text-xs text-[#FFCA28] font-medium mt-0.5">
                              {item.variantLabel}
                            </p>
                          )}

                          {item.selectedAddons && item.selectedAddons.length > 0 && (
                            <div className="text-[11px] text-[#A3B3D4] mt-0.5">
                              {item.selectedAddons.map((a) => a.name).join(', ')}
                            </div>
                          )}

                          <div className="text-xs font-bold text-white mt-1">
                            Rs. {unitPrice * item.quantity}
                            <span className="text-[10px] text-[#8B9DBF] font-normal ml-1">
                              (Rs. {unitPrice} each)
                            </span>
                          </div>
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex items-center bg-[#0E1A36] border border-[#1C3264] rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 text-[#A3B3D4] hover:text-white transition-colors cursor-pointer"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 text-[#A3B3D4] hover:text-white transition-colors cursor-pointer"
                              title="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 text-[#667EA6] hover:text-[#E92C2C] transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: CUSTOMER ORDER FORM */}
        {step === 'details' && (
          <form onSubmit={handleGenerateWhatsAppOrder} className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#132247]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFCA28]">
                Customer Details
              </span>
              <button
                type="button"
                onClick={() => setStep('review')}
                className="text-xs text-[#A3B3D4] hover:text-white cursor-pointer"
              >
                ← Back to Items
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-200">
                {formError}
              </div>
            )}

            {/* Order Preference */}
            <div>
              <label className="block text-xs font-medium text-[#A3B3D4] mb-1.5">
                Order Preference *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['delivery', 'pickup', 'dine-in'] as OrderType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setOrderType(type)}
                    className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-colors cursor-pointer ${
                      orderType === type
                        ? 'bg-[#E92C2C] border-[#E92C2C] text-white shadow-sm'
                        : 'bg-[#0E1A36] border-[#1C3264] text-[#A3B3D4] hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Name */}
            <div>
              <label className="block text-xs font-medium text-[#BDBDBD] mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Ramesh Shrestha"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E1A36] border border-[#1C3264] text-white text-sm focus:outline-none focus:border-[#E92C2C]"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-xs font-medium text-[#A3B3D4] mb-1">
                Contact Phone Number *
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="e.g. 98XXXXXXXX"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E1A36] border border-[#1C3264] text-white text-sm focus:outline-none focus:border-[#E92C2C]"
              />
            </div>

            {/* Delivery Address (if delivery) */}
            {orderType === 'delivery' && (
              <div>
                <label className="block text-xs font-medium text-[#A3B3D4] mb-1">
                  Delivery Address in Birgunj *
                </label>
                <textarea
                  rows={2}
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Street name, landmark, nearby complex..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0E1A36] border border-[#1C3264] text-white text-sm focus:outline-none focus:border-[#E92C2C]"
                />
              </div>
            )}

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-medium text-[#A3B3D4] mb-1">
                Special Kitchen Instructions (Optional)
              </label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Extra spicy, no onions, pack sauces separately..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#0E1A36] border border-[#1C3264] text-white text-sm focus:outline-none focus:border-[#E92C2C]"
              />
            </div>

            {/* Transparency Note */}
            <div className="p-3 rounded-lg bg-[#0B152B] border border-[#16274E] text-[11px] text-[#A3B3D4] flex items-start gap-2">
              <Info className="w-4 h-4 text-[#FFCA28] shrink-0 mt-0.5" />
              <span>
                Note: Submitting this order will format your items and customer details directly into
                a WhatsApp message to Hashtag Pizza ({restaurantInfo.phones.primary}) to confirm item
                availability and delivery fees.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Order via WhatsApp</span>
            </button>
          </form>
        )}

        {/* STEP 3: SUCCESS STATE */}
        {step === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h4 className="font-heading font-bold text-xl text-white">Order Message Generated!</h4>
            <p className="text-xs text-[#A3B3D4] mt-2 max-w-sm">
              Your order breakdown was transferred to WhatsApp. Please press "Send" in WhatsApp to
              dispatch it to Hashtag Pizza.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-[#0B152B] border border-[#16274E] text-left w-full text-xs space-y-2">
              <div className="flex justify-between text-[#8B9DBF]">
                <span>Recipient:</span>
                <span className="text-white font-mono">{restaurantInfo.phones.primary}</span>
              </div>
              <div className="flex justify-between text-[#8B9DBF]">
                <span>Order Total:</span>
                <span className="text-[#FFCA28] font-bold">Rs. {subtotal}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
              <a
                href={`tel:${restaurantInfo.phones.primary}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#0E1A36] border border-[#1C3264] text-white text-xs font-bold"
              >
                <Phone className="w-4 h-4 text-[#FFCA28]" />
                <span>Call Restaurant</span>
              </a>

              <button
                onClick={() => {
                  clearCart();
                  setStep('review');
                  setIsCartOpen(false);
                }}
                className="flex-1 py-3 rounded-lg bg-[#E92C2C] text-white text-xs font-bold uppercase tracking-wider"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Drawer Footer with Subtotal & Proceed (when reviewing items) */}
        {step === 'review' && cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#16274E] bg-[#0B152B] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#A3B3D4]">Estimated Subtotal</span>
              <span className="font-heading font-extrabold text-xl text-[#FFCA28]">
                Rs. {subtotal}
              </span>
            </div>
            <p className="text-[11px] text-[#8B9DBF]">
              Final delivery charges and preparation time confirmed by restaurant staff upon dispatch.
            </p>

            <button
              onClick={handleProceedToDetails}
              className="w-full py-3.5 rounded-lg bg-[#E92C2C] hover:bg-[#D02222] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 cursor-pointer"
            >
              <span>Continue to Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
