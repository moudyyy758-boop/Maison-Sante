import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DeliveryMethod } from '../types';
import { Truck, Store, AlertCircle, Clock, Calendar, MapPin, Check, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { BowIcon, DelicateDivider } from './DecorativeElements';

export const OrderForm: React.FC = () => {
  const { cart, subtotal, submitOrderRequest, navigateTo, addToast } = useApp();

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('Victoria Island / Ikoyi');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState('As soon as freshly prepared (~45 mins)');
  const [notes, setNotes] = useState('');

  // Validation & Loading
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (cart.length === 0) {
    return (
      <section className="w-full min-h-[60vh] bg-[#15130F] py-20 px-4 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 border border-[#4E4541] bg-[#1D1B17]">
          <div className="w-16 h-16 border border-[#4E4541] flex items-center justify-center mx-auto mb-4 bg-[#15130F]">
            <BowIcon size={24} className="text-[#9A8E89]" />
          </div>
          <h2 className="font-serif-luxury text-2xl text-[#FAF4EC] uppercase mb-2">
            YOUR ORDER IS EMPTY
          </h2>
          <p className="font-sans-clean text-xs text-[#D1C4BE] font-light mb-6">
            Please add dishes from our menu before proceeding to place an order request.
          </p>
          <button
            onClick={() => navigateTo('menu')}
            className="px-8 py-3 bg-[#FAF4EC] text-[#382D28] hover:bg-[#E3BEB8] font-sans-clean text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
          >
            EXPLORE THE MENU
          </button>
        </div>
      </section>
    );
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your name.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number so we can reach you.';
    }

    if (!deliveryMethod) {
      newErrors.deliveryMethod = 'Please select delivery or pickup.';
    }

    if (deliveryMethod === 'delivery' && !deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Please enter your delivery address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      addToast('Please complete the required order details.', 'remove');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitOrderRequest({
        customerName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        deliveryMethod,
        deliveryAddress: deliveryMethod === 'delivery' ? deliveryAddress.trim() : undefined,
        city: deliveryMethod === 'delivery' ? city : undefined,
        deliveryDate,
        deliveryTime: preferredTime,
        items: [...cart],
        subtotal,
        deliveryFee: 'To be confirmed',
        total: subtotal,
        notes: notes.trim() || undefined,
      });
    } catch (err) {
      console.error('Order submission error:', err);
      setSubmitError("We couldn't submit your order request. Please check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-[#15130F] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Back to menu navigation */}
        <button
          onClick={() => navigateTo('menu')}
          className="inline-flex items-center gap-2 text-xs font-sans-clean uppercase tracking-wider text-[#9A8E89] hover:text-[#FAF4EC] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Menu
        </button>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-sans-clean text-xs font-semibold uppercase tracking-[0.25em] text-[#E3BEB8] flex items-center justify-center gap-2">
            <BowIcon size={14} /> ORDER REQUEST <BowIcon size={14} />
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#FAF4EC] uppercase tracking-tight mt-2 mb-2">
            ALMOST THERE
          </h1>
          <p className="font-sans-clean text-sm text-[#D1C4BE] font-light">
            “Tell us where to bring your order.”
          </p>
        </div>

        {submitError && (
          <div className="mb-8 p-4 bg-[#382D28] border border-[#FFB4AB]/40 text-[#FFB4AB] text-xs font-sans-clean flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{submitError}</span>
            </div>
            <button
              onClick={() => setSubmitError(null)}
              className="text-xs uppercase tracking-wider underline hover:text-[#FAF4EC]"
            >
              TRY AGAIN
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Form Fields (7 cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
            
            {/* 1. Customer Information */}
            <div className="p-6 sm:p-8 bg-[#1A1814] border border-[#4E4541]/60 space-y-5">
              <div className="flex items-center justify-between border-b border-[#4E4541]/40 pb-3">
                <h3 className="font-serif-luxury text-lg text-[#FAF4EC] uppercase">
                  1. Customer Information
                </h3>
                <span className="text-[10px] text-[#9A8E89] font-sans-clean uppercase tracking-widest">
                  * Required
                </span>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-sans-clean uppercase tracking-wider text-[#FAF4EC]">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                  }}
                  placeholder="e.g. Amara Okafor"
                  className={`w-full bg-[#15130F] border p-3 text-xs sm:text-sm font-sans-clean text-[#FAF4EC] placeholder-[#9A8E89]/60 focus:outline-none ${
                    errors.fullName ? 'border-[#FFB4AB]' : 'border-[#4E4541] focus:border-[#FAF4EC]'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-[#FFB4AB] font-sans-clean">{errors.fullName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="block text-xs font-sans-clean uppercase tracking-wider text-[#FAF4EC]">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                  }}
                  placeholder="e.g. +234 801 234 5678"
                  className={`w-full bg-[#15130F] border p-3 text-xs sm:text-sm font-sans-clean text-[#FAF4EC] placeholder-[#9A8E89]/60 focus:outline-none ${
                    errors.phone ? 'border-[#FFB4AB]' : 'border-[#4E4541] focus:border-[#FAF4EC]'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-[#FFB4AB] font-sans-clean">{errors.phone}</p>
                )}
                <span className="text-[10px] text-[#9A8E89] block font-light">
                  Our concierge will call or message you to confirm preparation & payment.
                </span>
              </div>

              {/* Email (Optional) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-sans-clean uppercase tracking-wider text-[#FAF4EC]">
                  Email Address <span className="text-[#9A8E89] text-[10px] lowercase">(optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. amara@example.com"
                  className="w-full bg-[#15130F] border border-[#4E4541] focus:border-[#FAF4EC] p-3 text-xs sm:text-sm font-sans-clean text-[#FAF4EC] placeholder-[#9A8E89]/60 focus:outline-none"
                />
              </div>
            </div>

            {/* 2. Delivery Method */}
            <div className="p-6 sm:p-8 bg-[#1A1814] border border-[#4E4541]/60 space-y-6">
              <div className="flex items-center justify-between border-b border-[#4E4541]/40 pb-3">
                <h3 className="font-serif-luxury text-lg text-[#FAF4EC] uppercase">
                  2. Delivery Method
                </h3>
              </div>

              {/* Selectable Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('delivery')}
                  className={`p-4 border text-left flex items-start gap-3.5 transition-all ${
                    deliveryMethod === 'delivery'
                      ? 'border-[#FAF4EC] bg-[#2C2A25] text-[#FAF4EC]'
                      : 'border-[#4E4541] bg-[#15130F] text-[#D1C4BE] hover:border-[#9A8E89]'
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#E3BEB8] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif-luxury text-sm font-semibold uppercase">Doorstep Delivery</h4>
                    <p className="text-[11px] text-[#D1ADA7] font-light mt-0.5">
                      Delivered by dispatch to your home or office.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-4 border text-left flex items-start gap-3.5 transition-all ${
                    deliveryMethod === 'pickup'
                      ? 'border-[#FAF4EC] bg-[#2C2A25] text-[#FAF4EC]'
                      : 'border-[#4E4541] bg-[#15130F] text-[#D1C4BE] hover:border-[#9A8E89]'
                  }`}
                >
                  <Store className="w-5 h-5 text-[#E3BEB8] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif-luxury text-sm font-semibold uppercase">Studio Pickup</h4>
                    <p className="text-[11px] text-[#D1ADA7] font-light mt-0.5">
                      Pick up directly from Maison de Santé kitchen.
                    </p>
                  </div>
                </button>
              </div>

              {/* Conditional Address Fields */}
              {deliveryMethod === 'delivery' ? (
                <div className="space-y-4 pt-2 border-t border-[#4E4541]/40">
                  {/* Delivery Address */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans-clean uppercase tracking-wider text-[#FAF4EC]">
                      Delivery Address *
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => {
                        setDeliveryAddress(e.target.value);
                        if (errors.deliveryAddress) setErrors((prev) => ({ ...prev, deliveryAddress: '' }));
                      }}
                      placeholder="e.g. Flat 4B, Mulberry Court, 14 Adeola Odeku St"
                      className={`w-full bg-[#15130F] border p-3 text-xs sm:text-sm font-sans-clean text-[#FAF4EC] placeholder-[#9A8E89]/60 focus:outline-none ${
                        errors.deliveryAddress ? 'border-[#FFB4AB]' : 'border-[#4E4541] focus:border-[#FAF4EC]'
                      }`}
                    />
                    {errors.deliveryAddress && (
                      <p className="text-[11px] text-[#FFB4AB] font-sans-clean">{errors.deliveryAddress}</p>
                    )}
                  </div>

                  {/* City / Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-sans-clean uppercase tracking-wider text-[#FAF4EC]">
                        City / Area
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#15130F] border border-[#4E4541] focus:border-[#FAF4EC] p-3 text-xs font-sans-clean text-[#FAF4EC] focus:outline-none"
                      >
                        <option value="Victoria Island / Ikoyi">Victoria Island / Ikoyi</option>
                        <option value="Lekki Phase 1 / Oniru">Lekki Phase 1 / Oniru</option>
                        <option value="Ikate / Chevron / Lekki Expressway">Ikate / Chevron / Lekki Expressway</option>
                        <option value="Ikeja GRA / Mainland">Ikeja GRA / Mainland</option>
                        <option value="Marina / Lagos Island">Marina / Lagos Island</option>
                        <option value="Other Lagos Area">Other Lagos Area (Confirm with concierge)</option>
                      </select>
                    </div>

                    {/* Preferred Date */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-sans-clean uppercase tracking-wider text-[#FAF4EC]">
                        Requested Date
                      </label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full bg-[#15130F] border border-[#4E4541] focus:border-[#FAF4EC] p-3 text-xs font-sans-clean text-[#FAF4EC] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Preferred Delivery Time */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans-clean uppercase tracking-wider text-[#FAF4EC]">
                      Preferred Delivery Time
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full bg-[#15130F] border border-[#4E4541] focus:border-[#FAF4EC] p-3 text-xs font-sans-clean text-[#FAF4EC] focus:outline-none"
                    >
                      <option value="As soon as freshly prepared (~45 mins)">As soon as freshly prepared (~45 mins)</option>
                      <option value="Lunch: 12:00 PM – 1:00 PM">Lunch: 12:00 PM – 1:00 PM</option>
                      <option value="Afternoon: 1:30 PM – 3:00 PM">Afternoon: 1:30 PM – 3:00 PM</option>
                      <option value="Early Dinner: 5:00 PM – 6:30 PM">Early Dinner: 5:00 PM – 6:30 PM</option>
                      <option value="Evening: 7:00 PM – 8:30 PM">Evening: 7:00 PM – 8:30 PM</option>
                    </select>
                  </div>
                </div>
              ) : (
                /* Pickup info */
                <div className="p-4 bg-[#211F1B] border border-[#4E4541] text-xs font-sans-clean text-[#D1C4BE] space-y-2">
                  <p className="font-medium text-[#FAF4EC]">
                    Pickup location details will be confirmed with your order.
                  </p>
                  <p className="text-[11px] text-[#9A8E89]">
                    Our studio kitchen is located in Victoria Island / Ikoyi. We will prepare your meals to be ready fresh at your requested pickup slot.
                  </p>
                </div>
              )}
            </div>

            {/* 3. Order Notes */}
            <div className="p-6 sm:p-8 bg-[#1A1814] border border-[#4E4541]/60 space-y-4">
              <h3 className="font-serif-luxury text-lg text-[#FAF4EC] uppercase border-b border-[#4E4541]/40 pb-3">
                3. Order Notes
              </h3>
              <div className="space-y-1.5">
                <label className="block text-xs font-sans-clean uppercase tracking-wider text-[#FAF4EC]">
                  Additional Instructions
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything else we should know? (e.g. 'Please call when you arrive', 'Leave with building security', or dietary notes)"
                  className="w-full bg-[#15130F] border border-[#4E4541] focus:border-[#FAF4EC] p-3 text-xs sm:text-sm font-sans-clean text-[#FAF4EC] placeholder-[#9A8E89]/60 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* 4. Payment Notice Banner (Explicitly no card details) */}
            <div className="p-6 bg-[#26201D] border border-[#E3BEB8]/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-sans-clean uppercase tracking-widest text-[#E3BEB8] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>PAYMENT NOTE</span>
              </div>
              <p className="font-sans-clean text-xs text-[#FAF4EC] leading-relaxed">
                “Online payment is not currently available. After your order request is received, Maison de Santé will contact you to confirm payment arrangements.”
              </p>
              <span className="text-[11px] text-[#D1ADA7] block font-light">
                No credit card or banking details are collected on this site.
              </span>
            </div>

            {/* Submit Action (Mobile view) */}
            <div className="lg:hidden">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#FAF4EC] text-[#382D28] hover:bg-[#E3BEB8] font-sans-clean text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>SUBMITTING ORDER REQUEST...</span>
                  </>
                ) : (
                  <span>PLACE ORDER REQUEST</span>
                )}
              </button>
            </div>

          </form>

          {/* Sidebar Order Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-[#1A1814] border border-[#4E4541] p-6 sm:p-8 space-y-6 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-[#4E4541]/40 pb-4">
                <h3 className="font-serif-luxury text-xl text-[#FAF4EC] uppercase">
                  YOUR ORDER
                </h3>
                <span className="text-xs font-sans-clean text-[#D1ADA7]">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-3 text-xs font-sans-clean">
                    <div className="space-y-0.5">
                      <div className="font-medium text-[#FAF4EC]">
                        {item.quantity}x {item.name}
                      </div>
                      {item.selectedCustomizations.length > 0 && (
                        <div className="text-[10px] text-[#9A8E89]">
                          {item.selectedCustomizations.map((c) => c.optionName).join(', ')}
                        </div>
                      )}
                      {item.spiceLevel && (
                        <div className="text-[10px] text-[#E3BEB8]">Spice: {item.spiceLevel}</div>
                      )}
                    </div>
                    <span className="font-serif-luxury text-sm font-semibold text-[#FAF4EC] whitespace-nowrap">
                      ₦{item.totalPrice.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="border-t border-[#4E4541]/40 pt-4 space-y-2 text-xs font-sans-clean">
                <div className="flex justify-between text-[#D1C4BE]">
                  <span>Subtotal</span>
                  <span className="font-serif-luxury text-sm font-semibold text-[#FAF4EC]">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#9A8E89]">
                  <span>Delivery Fee</span>
                  <span className="italic text-[11px] text-[#D1ADA7]">To be confirmed</span>
                </div>
                <div className="pt-3 border-t border-[#4E4541]/50 flex justify-between items-baseline">
                  <span className="font-serif-luxury text-base text-[#FAF4EC] uppercase">
                    Total (Food Items)
                  </span>
                  <span className="font-serif-luxury text-2xl font-bold text-[#FAF4EC]">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Delivery Details Summary Badge */}
              <div className="p-3 bg-[#15130F] border border-[#4E4541]/50 text-[11px] font-sans-clean text-[#D1C4BE] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#9A8E89]">Method:</span>
                  <span className="uppercase text-[#FAF4EC] font-medium">{deliveryMethod}</span>
                </div>
                {deliveryMethod === 'delivery' && (
                  <div className="flex justify-between">
                    <span className="text-[#9A8E89]">Area:</span>
                    <span className="text-[#FAF4EC] text-right truncate max-w-[150px]">{city}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#9A8E89]">Time:</span>
                  <span className="text-[#FAF4EC] text-right truncate max-w-[150px]">{preferredTime}</span>
                </div>
              </div>

              {/* Desktop Submit Button */}
              <div className="hidden lg:block pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#FAF4EC] text-[#382D28] hover:bg-[#E3BEB8] font-sans-clean text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50 active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SUBMITTING ORDER REQUEST...</span>
                    </>
                  ) : (
                    <span>PLACE ORDER REQUEST</span>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-[#9A8E89] text-center font-light leading-normal">
                By clicking "Place Order Request", you agree to receive a confirmation message to coordinate preparation and payment.
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
