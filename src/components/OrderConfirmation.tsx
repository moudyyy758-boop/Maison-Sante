import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';
import { CheckCircle2, Clock, MapPin, Phone, User, Calendar, Share2, ArrowLeft, Utensils, Copy, ShieldCheck, ChevronRight, ClipboardList, RotateCcw } from 'lucide-react';
import { BowIcon, DelicateDivider } from './DecorativeElements';

export const OrderConfirmation: React.FC = () => {
  const { 
    latestOrder, 
    allOrders, 
    navigateTo, 
    updateOrderStatusInStorage, 
    addToast,
    selectedTrackingOrderId,
    setSelectedTrackingOrderId,
    reorderPastOrder 
  } = useApp();

  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    selectedTrackingOrderId || (latestOrder ? latestOrder.orderId : (allOrders[0]?.orderId || ''))
  );

  const activeOrder = allOrders.find((o) => o.orderId === selectedOrderId) || latestOrder || allOrders[0];

  if (!activeOrder) {
    return (
      <section className="w-full min-h-[60vh] bg-[#15130F] py-20 px-4 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 border border-[#4E4541] bg-[#1D1B17]">
          <div className="w-16 h-16 border border-[#4E4541] flex items-center justify-center mx-auto mb-4 bg-[#15130F]">
            <BowIcon size={24} className="text-[#9A8E89]" />
          </div>
          <h2 className="font-serif-luxury text-2xl text-[#FAF4EC] uppercase mb-2">
            NO RECENT ORDERS FOUND
          </h2>
          <p className="font-sans-clean text-xs text-[#D1C4BE] font-light mb-6">
            You haven't submitted any order requests in this session yet. Explore our delicious menu to get started!
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

  // Tracking Stages
  const stages: { key: OrderStatus; label: string; desc: string }[] = [
    { key: 'received', label: 'ORDER RECEIVED', desc: 'Request logged & queued for concierge' },
    { key: 'confirming', label: 'CONFIRMING ORDER', desc: 'Concierge verifying kitchen queue & payment' },
    { key: 'preparing', label: 'PREPARING', desc: 'Artisanal chefs cooking your dishes' },
    { key: 'out_for_delivery', label: 'OUT FOR DELIVERY', desc: 'Courier en route to your destination' },
    { key: 'delivered', label: 'DELIVERED', desc: 'Meal delivered with elegance' },
  ];

  const currentStageIndex = stages.findIndex((s) => s.key === activeOrder.status);

  // Share functionality
  const handleShare = async () => {
    const shareText = 'Discover Maison de Santé — good food, beautifully made.';
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Maison de Santé',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast('Maison de Santé link copied to clipboard! ♡', 'success');
  };

  return (
    <section className="w-full bg-[#15130F] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation back & Order History */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <button
            onClick={() => navigateTo('menu')}
            className="inline-flex items-center gap-2 text-xs font-sans-clean uppercase tracking-wider text-[#9A8E89] hover:text-[#FAF4EC] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Menu
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('order-history')}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-sans-clean uppercase tracking-wider text-[#D1ADA7] hover:text-[#FAF4EC] border border-[#4E4541] hover:border-[#9A8E89] transition-colors"
            >
              <ClipboardList className="w-3.5 h-3.5 text-[#E3BEB8]" />
              <span>All Order History ({allOrders.length})</span>
            </button>

            {/* If user has multiple past orders */}
            {allOrders.length > 1 && (
              <div className="flex items-center gap-2">
                <select
                  value={selectedOrderId}
                  onChange={(e) => setSelectedOrderId(e.target.value)}
                  className="bg-[#1D1B17] border border-[#4E4541] text-xs font-sans-clean text-[#FAF4EC] px-2 py-1 focus:outline-none"
                >
                  {allOrders.map((o) => (
                    <option key={o.orderId} value={o.orderId}>
                      {o.orderId} ({new Date(o.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation Header Hero Box */}
        <div className="bg-[#1A1814] border border-[#9A8E89]/40 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl mb-8">
          
          <div className="inline-flex items-center justify-center w-14 h-14 border border-[#E3BEB8] bg-[#2C2A25] text-[#FAF4EC] mb-5">
            <span className="font-serif-luxury text-2xl text-[#E3BEB8]">♡</span>
          </div>

          <span className="block font-sans-clean text-xs font-semibold uppercase tracking-[0.25em] text-[#E3BEB8] mb-2">
            THANK YOU FOR YOUR REQUEST
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#FAF4EC] uppercase tracking-tight mb-4">
            ORDER RECEIVED ♡
          </h1>
          <DelicateDivider icon="bow" className="max-w-xs my-4" />

          <p className="font-sans-clean text-sm sm:text-base text-[#D1C4BE] font-light max-w-xl mx-auto leading-relaxed mb-6">
            “Thank you for choosing Maison de Santé. We've received your order request and will contact you shortly to confirm the details.”
          </p>

          <div className="inline-block bg-[#15130F] border border-[#4E4541] px-6 py-3">
            <span className="text-[11px] font-sans-clean uppercase tracking-widest text-[#9A8E89] block">
              Reference Order Number
            </span>
            <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#FAF4EC] tracking-wider mt-0.5 block">
              {activeOrder.orderId}
            </span>
          </div>

        </div>

        {/* ORDER STATUS TRACKER */}
        <div className="bg-[#1A1814] border border-[#4E4541]/60 p-6 sm:p-8 mb-8 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#4E4541]/40 pb-4 mb-6">
            <div>
              <h3 className="font-serif-luxury text-lg text-[#FAF4EC] uppercase">
                Order Status Tracker
              </h3>
              <p className="text-[11px] font-sans-clean text-[#9A8E89]">
                Live request progress with Maison kitchen concierge
              </p>
            </div>
            <span className="px-3 py-1 bg-[#382D28] border border-[#E3BEB8]/40 text-[#E3BEB8] font-sans-clean text-xs uppercase tracking-widest font-semibold">
              {activeOrder.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {stages.map((stage, idx) => {
              const isPassed = idx <= (currentStageIndex === -1 ? 0 : currentStageIndex);
              const isCurrent = idx === currentStageIndex;

              return (
                <div
                  key={stage.key}
                  className={`p-4 border transition-all ${
                    isCurrent
                      ? 'border-[#FAF4EC] bg-[#2C2A25] text-[#FAF4EC] shadow-md'
                      : isPassed
                      ? 'border-[#4E4541] bg-[#1D1B17] text-[#FAF4EC]'
                      : 'border-[#4E4541]/40 bg-[#15130F]/60 text-[#9A8E89]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-sans-clean font-bold tracking-widest text-[#E3BEB8]">
                      0{idx + 1}
                    </span>
                    {isPassed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E3BEB8]" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-[#9A8E89]" />
                    )}
                  </div>
                  <h4 className="font-serif-luxury text-xs uppercase font-semibold leading-snug">
                    {stage.label}
                  </h4>
                  <p className="text-[10px] font-sans-clean text-[#D1C4BE] font-light mt-1 leading-normal">
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Prototype Status Simulator (Demonstrates backend readiness without altering standard customer state) */}
          <div className="mt-6 pt-4 border-t border-[#4E4541]/30 flex flex-wrap items-center justify-between gap-3 text-xs font-sans-clean text-[#9A8E89]">
            <span className="flex items-center gap-1.5 text-[11px] text-[#D1ADA7]">
              <BowIcon size={13} /> Simulation controls:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {stages.map((s) => (
                <button
                  key={s.key}
                  onClick={() => updateOrderStatusInStorage(activeOrder.orderId, s.key)}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-wider border transition-colors ${
                    activeOrder.status === s.key
                      ? 'bg-[#FAF4EC] text-[#382D28] border-[#FAF4EC] font-semibold'
                      : 'bg-[#15130F] text-[#D1C4BE] border-[#4E4541] hover:border-[#9A8E89]'
                  }`}
                >
                  {s.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order Details & Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Customer & Delivery Information */}
          <div className="p-6 sm:p-8 bg-[#1A1814] border border-[#4E4541]/60 space-y-5">
            <h3 className="font-serif-luxury text-lg text-[#FAF4EC] uppercase border-b border-[#4E4541]/40 pb-3">
              Delivery & Contact Details
            </h3>

            <div className="space-y-3.5 text-xs font-sans-clean">
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-[#E3BEB8] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#9A8E89] uppercase tracking-wider block">Customer Name</span>
                  <span className="text-[#FAF4EC] font-medium text-sm">{activeOrder.customerName}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#E3BEB8] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#9A8E89] uppercase tracking-wider block">Phone Contact</span>
                  <span className="text-[#FAF4EC] font-medium">{activeOrder.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E3BEB8] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#9A8E89] uppercase tracking-wider block">
                    Fulfillment Method
                  </span>
                  <span className="text-[#FAF4EC] font-medium uppercase">
                    {activeOrder.deliveryMethod === 'delivery' ? 'Doorstep Delivery' : 'Studio Pickup'}
                  </span>
                  {activeOrder.deliveryAddress && (
                    <p className="text-[#D1C4BE] mt-0.5 font-light">
                      {activeOrder.deliveryAddress}
                      {activeOrder.city ? `, ${activeOrder.city}` : ''}
                    </p>
                  )}
                  {activeOrder.deliveryMethod === 'pickup' && (
                    <p className="text-[#D1ADA7] mt-0.5 font-light italic">
                      Studio pickup location details will be confirmed with you via phone/WhatsApp.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-[#E3BEB8] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#9A8E89] uppercase tracking-wider block">Requested Timing</span>
                  <span className="text-[#FAF4EC] font-medium">
                    {activeOrder.deliveryDate} — {activeOrder.deliveryTime}
                  </span>
                </div>
              </div>

              {activeOrder.notes && (
                <div className="pt-2 border-t border-[#4E4541]/40">
                  <span className="text-[10px] text-[#9A8E89] uppercase tracking-wider block">Special Instructions</span>
                  <p className="text-[#D1C4BE] italic font-light mt-0.5">“{activeOrder.notes}”</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Items & Payment Note */}
          <div className="p-6 sm:p-8 bg-[#1A1814] border border-[#4E4541]/60 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="font-serif-luxury text-lg text-[#FAF4EC] uppercase border-b border-[#4E4541]/40 pb-3 mb-4">
                Requested Dishes
              </h3>

              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {activeOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start text-xs font-sans-clean">
                    <div>
                      <span className="font-medium text-[#FAF4EC]">
                        {item.quantity}x {item.name}
                      </span>
                      {item.selectedCustomizations.length > 0 && (
                        <p className="text-[10px] text-[#9A8E89]">
                          {item.selectedCustomizations.map((c) => c.optionName).join(', ')}
                        </p>
                      )}
                    </div>
                    <span className="font-serif-luxury text-sm font-semibold text-[#FAF4EC]">
                      ₦{item.totalPrice.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#4E4541]/40 pt-4 mt-4 space-y-2 text-xs font-sans-clean">
                <div className="flex justify-between text-[#D1C4BE]">
                  <span>Items Subtotal</span>
                  <span className="font-serif-luxury text-sm font-semibold text-[#FAF4EC]">
                    ₦{activeOrder.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#9A8E89]">
                  <span>Delivery Fee</span>
                  <span className="italic text-[11px] text-[#D1ADA7]">{activeOrder.deliveryFee}</span>
                </div>
                <div className="pt-2 border-t border-[#4E4541]/50 flex justify-between items-baseline">
                  <span className="font-serif-luxury text-sm uppercase text-[#FAF4EC]">Total Request</span>
                  <span className="font-serif-luxury text-xl font-bold text-[#FAF4EC]">
                    ₦{activeOrder.subtotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment status statement */}
            <div className="p-4 bg-[#26201D] border border-[#E3BEB8]/40 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-sans-clean uppercase tracking-wider text-[#E3BEB8] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Payment Notice</span>
              </div>
              <p className="font-sans-clean text-xs text-[#FAF4EC] leading-normal font-light">
                Payment status: <strong>Payment pending</strong> — arrangements will be confirmed directly with you by the Maison de Santé concierge.
              </p>
            </div>

          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => navigateTo('menu')}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#FAF4EC] text-[#382D28] hover:bg-[#E3BEB8] font-sans-clean text-xs font-semibold uppercase tracking-[0.2em] transition-colors shadow-lg"
          >
            BACK TO MENU
          </button>

          <button
            onClick={() => reorderPastOrder(activeOrder)}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#2C2A25] border border-[#E3BEB8] text-[#FAF4EC] hover:bg-[#E3BEB8] hover:text-[#382D28] font-sans-clean text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>REORDER DISHES</span>
          </button>

          <button
            onClick={() => navigateTo('order-history')}
            className="w-full sm:w-auto px-6 py-3.5 bg-transparent border border-[#9A8E89] text-[#D1C4BE] hover:text-[#FAF4EC] hover:border-[#FAF4EC] font-sans-clean text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
          >
            <ClipboardList className="w-4 h-4 text-[#E3BEB8]" />
            <span>PAST ORDERS</span>
          </button>
          
          <button
            onClick={handleShare}
            className="w-full sm:w-auto px-5 py-3.5 bg-transparent border border-[#4E4541] text-[#9A8E89] hover:text-[#FAF4EC] hover:border-[#9A8E89] font-sans-clean text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
            title="Share Maison de Santé"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden lg:inline">SHARE</span>
          </button>
        </div>

      </div>
    </section>
  );
};
