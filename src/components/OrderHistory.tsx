import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import { 
  ClipboardList, 
  Search, 
  ArrowLeft, 
  RotateCcw, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Calendar, 
  Copy, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  ShoppingBag, 
  Sparkles,
  ExternalLink,
  Filter,
  Check,
  AlertTriangle
} from 'lucide-react';
import { BowIcon, DelicateDivider } from './DecorativeElements';

export const OrderHistory: React.FC = () => {
  const { 
    allOrders, 
    navigateTo, 
    reorderPastOrder, 
    deleteOrderFromStorage, 
    clearAllOrders, 
    seedDemoOrder,
    setSelectedTrackingOrderId,
    addToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [methodFilter, setMethodFilter] = useState<'all' | 'delivery' | 'pickup'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest'>('newest');
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [isClearingAll, setIsClearingAll] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Toggle order expansion
  const toggleExpand = (orderId: string) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  // Copy reference ID
  const handleCopyId = (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(orderId);
    setCopiedId(orderId);
    addToast(`Order ID ${orderId} copied to clipboard!`, 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Copy complete summary for sharing / WhatsApp
  const handleCopySummary = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation();
    const itemsList = order.items
      .map(i => `• ${i.quantity}x ${i.name} (₦${i.totalPrice.toLocaleString()})`)
      .join('\n');
    
    const summary = `*MAISON DE SANTÉ — ORDER REQUEST*\nRef: ${order.orderId}\nDate: ${new Date(order.submittedAt).toLocaleString()}\nStatus: ${order.status.toUpperCase()}\nMethod: ${order.deliveryMethod === 'delivery' ? 'Doorstep Delivery' : 'Studio Pickup'}\n\n*Dishes:*\n${itemsList}\n\n*Subtotal:* ₦${order.subtotal.toLocaleString()}\n*Delivery Fee:* ${order.deliveryFee}\n*Recipient:* ${order.customerName} (${order.phone})\n*Address/Area:* ${order.deliveryAddress || 'Studio Pickup'}${order.city ? ', ' + order.city : ''}`;
    
    navigator.clipboard.writeText(summary);
    addToast(`Order summary for #${order.orderId} copied!`, 'success');
  };

  // Track specific order
  const handleTrackOrder = (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTrackingOrderId(orderId);
    navigateTo('order-confirmation');
  };

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    return allOrders.filter(order => {
      // Search matches ID, customer name, dish names, or phone
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        order.orderId.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.phone.toLowerCase().includes(query) ||
        order.items.some(item => item.name.toLowerCase().includes(query));

      // Status filter
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

      // Method filter
      const matchesMethod = methodFilter === 'all' || order.deliveryMethod === methodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      }
      if (sortBy === 'highest') {
        return b.subtotal - a.subtotal;
      }
      return 0;
    });
  }, [allOrders, searchQuery, statusFilter, methodFilter, sortBy]);

  // Summary Metrics
  const metrics = useMemo(() => {
    const totalOrders = allOrders.length;
    const totalDishes = allOrders.reduce((sum, o) => sum + o.items.reduce((iSum, item) => iSum + item.quantity, 0), 0);
    const totalSpent = allOrders.reduce((sum, o) => sum + o.subtotal, 0);
    const lastOrder = allOrders[0];

    return {
      totalOrders,
      totalDishes,
      totalSpent,
      lastOrderDate: lastOrder ? new Date(lastOrder.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : null
    };
  }, [allOrders]);

  // Helper for status badge styling
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'received':
        return {
          label: 'Received',
          bg: 'bg-[#2E2822] text-[#D1ADA7] border-[#4E4541]',
          dot: 'bg-[#D1ADA7]'
        };
      case 'confirming':
        return {
          label: 'Confirming',
          bg: 'bg-[#332A24] text-[#E3BEB8] border-[#9A8E89]/50',
          dot: 'bg-[#E3BEB8] animate-pulse'
        };
      case 'preparing':
        return {
          label: 'Preparing',
          bg: 'bg-[#382E20] text-[#E8C28A] border-[#7D6B4E]',
          dot: 'bg-[#E8C28A] animate-pulse'
        };
      case 'out_for_delivery':
        return {
          label: 'Out for Delivery',
          bg: 'bg-[#21302A] text-[#A3D9C9] border-[#3F6355]',
          dot: 'bg-[#A3D9C9] animate-ping'
        };
      case 'delivered':
        return {
          label: 'Delivered',
          bg: 'bg-[#1C2A20] text-[#86EFAC] border-[#2E593E]',
          dot: 'bg-[#86EFAC]'
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          bg: 'bg-[#331C1C] text-[#FCA5A5] border-[#692929]',
          dot: 'bg-[#FCA5A5]'
        };
      default:
        return {
          label: status,
          bg: 'bg-[#2C2A25] text-[#FAF4EC] border-[#4E4541]',
          dot: 'bg-[#FAF4EC]'
        };
    }
  };

  return (
    <section className="w-full bg-[#15130F] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 min-h-[85vh]">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#4E4541]/40">
          <button
            onClick={() => navigateTo('menu')}
            className="inline-flex items-center gap-2 text-xs font-sans-clean uppercase tracking-wider text-[#9A8E89] hover:text-[#FAF4EC] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Menu
          </button>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-sans-clean uppercase tracking-widest text-[#D1ADA7] flex items-center gap-1.5">
              <ClipboardList className="w-3.5 h-3.5 text-[#E3BEB8]" />
              <span>Local Archive</span>
            </span>
          </div>
        </div>

        {/* Page Title & Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 border border-[#4E4541] bg-[#1D1B17] text-[#E3BEB8] mb-4">
            <BowIcon size={20} />
          </div>
          <span className="block font-sans-clean text-xs font-semibold uppercase tracking-[0.25em] text-[#E3BEB8] mb-2">
            YOUR CULINARY ARCHIVE
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#FAF4EC] uppercase tracking-tight mb-3">
            ORDER HISTORY
          </h1>
          <DelicateDivider icon="bow" className="max-w-xs my-3" />
          <p className="font-sans-clean text-xs sm:text-sm text-[#D1C4BE] font-light leading-relaxed">
            Review past culinary requests stored in your browser session. Reorder your favorite dishes or check live fulfillment statuses with our concierge team.
          </p>
        </div>

        {/* Overview Metrics Cards */}
        {allOrders.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="p-4 bg-[#1A1814] border border-[#4E4541]/60 text-center">
              <span className="text-[10px] font-sans-clean uppercase tracking-widest text-[#9A8E89] block mb-1">
                Total Requests
              </span>
              <span className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF4EC] font-bold">
                {metrics.totalOrders}
              </span>
            </div>

            <div className="p-4 bg-[#1A1814] border border-[#4E4541]/60 text-center">
              <span className="text-[10px] font-sans-clean uppercase tracking-widest text-[#9A8E89] block mb-1">
                Dishes Ordered
              </span>
              <span className="font-serif-luxury text-2xl sm:text-3xl text-[#FAF4EC] font-bold">
                {metrics.totalDishes}
              </span>
            </div>

            <div className="p-4 bg-[#1A1814] border border-[#4E4541]/60 text-center">
              <span className="text-[10px] font-sans-clean uppercase tracking-widest text-[#9A8E89] block mb-1">
                Total Requested
              </span>
              <span className="font-serif-luxury text-xl sm:text-2xl text-[#FAF4EC] font-bold">
                ₦{metrics.totalSpent.toLocaleString()}
              </span>
            </div>

            <div className="p-4 bg-[#1A1814] border border-[#4E4541]/60 text-center">
              <span className="text-[10px] font-sans-clean uppercase tracking-widest text-[#9A8E89] block mb-1">
                Last Activity
              </span>
              <span className="font-serif-luxury text-sm sm:text-base text-[#E3BEB8] font-medium block mt-1 truncate">
                {metrics.lastOrderDate || 'None'}
              </span>
            </div>
          </div>
        )}

        {/* Filter, Search & Controls Bar */}
        {allOrders.length > 0 && (
          <div className="bg-[#1A1814] border border-[#4E4541]/60 p-4 sm:p-5 mb-8 space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A8E89]" />
                <input
                  type="text"
                  placeholder="Search by Order ID, dish name, or customer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#15130F] border border-[#4E4541] focus:border-[#E3BEB8] text-xs font-sans-clean text-[#FAF4EC] pl-10 pr-4 py-2.5 placeholder:text-[#9A8E89] focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#9A8E89] hover:text-[#FAF4EC]"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* Action Buttons: Clear all or load demo */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setIsClearingAll(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-[11px] font-sans-clean uppercase tracking-wider text-[#D1ADA7] hover:text-[#FAF4EC] border border-[#4E4541] hover:border-[#9A8E89] transition-colors"
                  title="Clear all stored orders from local storage"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear History</span>
                </button>
              </div>
            </div>

            {/* Filter Tabs & Sort */}
            <div className="pt-3 border-t border-[#4E4541]/40 flex flex-wrap items-center justify-between gap-3 text-xs font-sans-clean">
              
              {/* Status Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#9A8E89] mr-1">Status:</span>
                {(['all', 'received', 'confirming', 'preparing', 'out_for_delivery', 'delivered'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-2.5 py-1 text-[11px] uppercase tracking-wider border transition-colors ${
                      statusFilter === status
                        ? 'bg-[#FAF4EC] text-[#382D28] border-[#FAF4EC] font-semibold'
                        : 'bg-[#15130F] text-[#D1C4BE] border-[#4E4541] hover:border-[#9A8E89]'
                    }`}
                  >
                    {status === 'all' ? 'All' : status.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* Delivery Method & Sort */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#9A8E89]">Method:</span>
                  <select
                    value={methodFilter}
                    onChange={(e) => setMethodFilter(e.target.value as any)}
                    className="bg-[#15130F] border border-[#4E4541] text-[11px] text-[#FAF4EC] px-2 py-1 focus:outline-none"
                  >
                    <option value="all">All Methods</option>
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pickup</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#9A8E89]">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#15130F] border border-[#4E4541] text-[11px] text-[#FAF4EC] px-2 py-1 focus:outline-none"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Amount</option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ORDERS LIST */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const isExpanded = expandedOrders[order.orderId] ?? true; // expanded by default
              const statusInfo = getStatusBadge(order.status);
              const formattedDate = new Date(order.submittedAt).toLocaleDateString(undefined, {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });
              const formattedTime = new Date(order.submittedAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={order.orderId}
                  className="bg-[#1A1814] border border-[#4E4541]/70 shadow-xl overflow-hidden transition-all duration-200"
                >
                  {/* Order Top Bar Header */}
                  <div 
                    onClick={() => toggleExpand(order.orderId)}
                    className="p-5 sm:p-6 bg-[#1F1D19] border-b border-[#4E4541]/50 cursor-pointer hover:bg-[#25221D] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    {/* Left: Ref & Date */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="font-serif-luxury text-lg sm:text-xl font-bold text-[#FAF4EC] tracking-wider">
                          {order.orderId}
                        </span>

                        <button
                          onClick={(e) => handleCopyId(order.orderId, e)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider bg-[#15130F] border border-[#4E4541] hover:border-[#9A8E89] text-[#D1ADA7] transition-colors"
                          title="Copy order reference number"
                        >
                          {copiedId === order.orderId ? (
                            <>
                              <Check className="w-3 h-3 text-[#86EFAC]" />
                              <span className="text-[#86EFAC]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Ref</span>
                            </>
                          )}
                        </button>

                        {/* Status Badge */}
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-sans-clean font-semibold uppercase tracking-wider border rounded-none ${statusInfo.bg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                          <span>{statusInfo.label}</span>
                        </div>

                        {/* Delivery Method Pill */}
                        <span className="text-[10px] font-sans-clean uppercase tracking-wider text-[#9A8E89] px-2 py-0.5 bg-[#15130F] border border-[#4E4541]/50">
                          {order.deliveryMethod === 'delivery' ? 'Doorstep Delivery' : 'Studio Pickup'}
                        </span>
                      </div>

                      <p className="text-xs font-sans-clean text-[#9A8E89] flex items-center gap-2">
                        <span>Submitted on {formattedDate} at {formattedTime}</span>
                        <span>•</span>
                        <span>{order.items.reduce((s, i) => s + i.quantity, 0)} {order.items.length === 1 ? 'item' : 'items'}</span>
                      </p>
                    </div>

                    {/* Right: Subtotal & Collapse Toggle */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#4E4541]/30">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] font-sans-clean uppercase tracking-wider text-[#9A8E89] block">
                          Total Request
                        </span>
                        <span className="font-serif-luxury text-xl font-bold text-[#FAF4EC]">
                          ₦{order.subtotal.toLocaleString()}
                        </span>
                      </div>

                      <div className="p-1.5 text-[#9A8E89] hover:text-[#FAF4EC]">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Order Expanded Details */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 space-y-6">
                      
                      {/* Grid: Ordered Dishes & Customer Info */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Dishes List (2 cols on lg) */}
                        <div className="lg:col-span-2 space-y-3">
                          <span className="text-[11px] font-sans-clean uppercase tracking-widest text-[#E3BEB8] block font-semibold">
                            Ordered Dishes & Customizations
                          </span>

                          <div className="space-y-3 divide-y divide-[#4E4541]/30">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="pt-3 first:pt-0 flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                  {item.image && (
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-12 h-12 object-cover border border-[#4E4541] flex-shrink-0 bg-[#15130F]"
                                      referrerPolicy="no-referrer"
                                    />
                                  )}
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-xs sm:text-sm text-[#FAF4EC]">
                                        {item.quantity}x {item.name}
                                      </span>
                                      {item.spiceLevel && (
                                        <span className="text-[9px] px-1.5 py-0.2 bg-[#382D28] text-[#E3BEB8] border border-[#E3BEB8]/30">
                                          {item.spiceLevel}
                                        </span>
                                      )}
                                    </div>

                                    {/* Customizations tags */}
                                    {item.selectedCustomizations && item.selectedCustomizations.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {item.selectedCustomizations.map((cust, cIdx) => (
                                          <span 
                                            key={cIdx} 
                                            className="text-[10px] text-[#D1ADA7] bg-[#15130F] px-1.5 py-0.5 border border-[#4E4541]/50"
                                          >
                                            {cust.groupName}: {cust.optionName} {cust.priceDelta > 0 ? `(+₦${cust.priceDelta.toLocaleString()})` : ''}
                                          </span>
                                        ))}
                                      </div>
                                    )}

                                    {item.specialInstructions && (
                                      <p className="text-[10px] text-[#9A8E89] italic mt-1">
                                        Note: “{item.specialInstructions}”
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <span className="font-serif-luxury text-sm font-semibold text-[#FAF4EC] whitespace-nowrap">
                                  ₦{item.totalPrice.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Financial Summary */}
                          <div className="pt-4 border-t border-[#4E4541]/50 space-y-1.5 text-xs font-sans-clean">
                            <div className="flex justify-between text-[#D1C4BE]">
                              <span>Dishes Subtotal</span>
                              <span className="font-serif-luxury text-xs sm:text-sm font-semibold text-[#FAF4EC]">
                                ₦{order.subtotal.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-[#9A8E89]">
                              <span>Delivery Concierge Fee</span>
                              <span className="italic text-[11px] text-[#D1ADA7]">{order.deliveryFee}</span>
                            </div>
                            <div className="flex justify-between text-[#FAF4EC] pt-2 border-t border-[#4E4541]/40 font-semibold">
                              <span className="font-serif-luxury uppercase">Total Order Request</span>
                              <span className="font-serif-luxury text-base sm:text-lg text-[#FAF4EC]">
                                ₦{order.subtotal.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Customer & Fulfillment Info Column */}
                        <div className="p-4 bg-[#15130F] border border-[#4E4541]/50 space-y-4 text-xs font-sans-clean flex flex-col justify-between">
                          <div className="space-y-3">
                            <span className="text-[11px] font-sans-clean uppercase tracking-widest text-[#E3BEB8] block font-semibold border-b border-[#4E4541]/40 pb-2">
                              Fulfillment Details
                            </span>

                            <div className="space-y-2">
                              <div>
                                <span className="text-[10px] text-[#9A8E89] uppercase tracking-wider block">Customer</span>
                                <span className="text-[#FAF4EC] font-medium">{order.customerName}</span>
                              </div>

                              <div>
                                <span className="text-[10px] text-[#9A8E89] uppercase tracking-wider block">Contact Phone</span>
                                <span className="text-[#FAF4EC]">{order.phone}</span>
                              </div>

                              <div>
                                <span className="text-[10px] text-[#9A8E89] uppercase tracking-wider block">Method & Address</span>
                                <span className="text-[#FAF4EC] uppercase font-medium">
                                  {order.deliveryMethod === 'delivery' ? 'Doorstep Delivery' : 'Studio Pickup'}
                                </span>
                                {order.deliveryAddress && (
                                  <p className="text-[#D1C4BE] font-light mt-0.5">
                                    {order.deliveryAddress}{order.city ? `, ${order.city}` : ''}
                                  </p>
                                )}
                              </div>

                              <div>
                                <span className="text-[10px] text-[#9A8E89] uppercase tracking-wider block">Requested Schedule</span>
                                <span className="text-[#FAF4EC]">
                                  {order.deliveryDate || 'Standard'} — {order.deliveryTime || 'ASAP'}
                                </span>
                              </div>

                              {order.notes && (
                                <div>
                                  <span className="text-[10px] text-[#9A8E89] uppercase tracking-wider block">Order Notes</span>
                                  <p className="text-[#D1ADA7] italic font-light text-[11px]">
                                    “{order.notes}”
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Payment notice */}
                          <div className="p-2.5 bg-[#251F1C] border border-[#E3BEB8]/30 text-[11px] text-[#D1ADA7]">
                            <span className="text-[#FAF4EC] font-semibold block">Payment: Pending</span>
                            Arrangements confirmed via concierge call/chat.
                          </div>
                        </div>

                      </div>

                      {/* Action Buttons Bar for this Order */}
                      <div className="pt-4 border-t border-[#4E4541]/40 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Reorder Button */}
                          <button
                            onClick={() => reorderPastOrder(order)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF4EC] text-[#382D28] hover:bg-[#E3BEB8] transition-colors font-sans-clean text-xs font-semibold uppercase tracking-wider"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Reorder Dishes</span>
                          </button>

                          {/* Track Request */}
                          <button
                            onClick={(e) => handleTrackOrder(order.orderId, e)}
                            className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#2C2A25] border border-[#9A8E89]/60 hover:border-[#FAF4EC] text-[#FAF4EC] transition-colors font-sans-clean text-xs uppercase tracking-wider"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-[#E3BEB8]" />
                            <span>Track Live Status</span>
                          </button>

                          {/* Copy Summary */}
                          <button
                            onClick={(e) => handleCopySummary(order, e)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-transparent border border-[#4E4541] hover:border-[#9A8E89] text-[#D1C4BE] hover:text-[#FAF4EC] transition-colors font-sans-clean text-xs uppercase tracking-wider"
                            title="Copy formatted order summary"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Share Summary</span>
                          </button>
                        </div>

                        {/* Delete Single Order */}
                        <button
                          onClick={() => setOrderToDelete(order.orderId)}
                          className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-sans-clean uppercase tracking-wider text-[#9A8E89] hover:text-[#FCA5A5] transition-colors"
                          title="Remove this order record from browser"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Delete Record</span>
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="bg-[#1A1814] border border-[#4E4541] p-10 sm:p-14 text-center max-w-lg mx-auto shadow-2xl space-y-6">
            <div className="w-16 h-16 border border-[#4E4541] bg-[#15130F] flex items-center justify-center mx-auto text-[#9A8E89]">
              <ClipboardList className="w-7 h-7 text-[#E3BEB8]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-luxury text-2xl text-[#FAF4EC] uppercase">
                {allOrders.length === 0 ? 'NO PAST ORDERS FOUND' : 'NO MATCHING ORDERS'}
              </h3>
              <p className="font-sans-clean text-xs sm:text-sm text-[#D1C4BE] font-light leading-relaxed">
                {allOrders.length === 0 
                  ? "You haven't submitted any order requests on this device yet. Explore our curated menu and place your first culinary request!"
                  : "No past orders match your current search or filter criteria. Try resetting your search filters."}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              {allOrders.length === 0 ? (
                <>
                  <button
                    onClick={() => navigateTo('menu')}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF4EC] text-[#382D28] hover:bg-[#E3BEB8] font-sans-clean text-xs font-semibold uppercase tracking-[0.2em] transition-colors shadow-lg"
                  >
                    EXPLORE MENU
                  </button>
                  <button
                    onClick={seedDemoOrder}
                    className="w-full sm:w-auto px-6 py-3.5 bg-transparent border border-[#4E4541] hover:border-[#E3BEB8] text-[#D1ADA7] hover:text-[#FAF4EC] font-sans-clean text-xs font-semibold uppercase tracking-[0.15em] transition-colors"
                    title="Populate an example past order to test the history interface"
                  >
                    + LOAD SAMPLE ORDER
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setMethodFilter('all');
                  }}
                  className="px-6 py-3 bg-[#FAF4EC] text-[#382D28] hover:bg-[#E3BEB8] font-sans-clean text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  RESET FILTERS
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* MODAL: Confirm Delete Single Order */}
      {orderToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#15130F]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1D1B17] border border-[#4E4541] p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-[#FCA5A5]">
              <AlertTriangle className="w-5 h-5" />
              <h4 className="font-serif-luxury text-lg text-[#FAF4EC] uppercase">Delete Order Record?</h4>
            </div>
            <p className="font-sans-clean text-xs text-[#D1C4BE] font-light leading-relaxed">
              Are you sure you want to remove reference <strong>#{orderToDelete}</strong> from your local browser history? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setOrderToDelete(null)}
                className="px-4 py-2 border border-[#4E4541] text-[#D1C4BE] hover:text-[#FAF4EC] text-xs font-sans-clean uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteOrderFromStorage(orderToDelete);
                  setOrderToDelete(null);
                }}
                className="px-4 py-2 bg-[#692929] hover:bg-[#853434] text-[#FAF4EC] text-xs font-sans-clean uppercase tracking-wider font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Confirm Clear All Orders */}
      {isClearingAll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#15130F]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1D1B17] border border-[#4E4541] p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-[#FCA5A5]">
              <Trash2 className="w-5 h-5" />
              <h4 className="font-serif-luxury text-lg text-[#FAF4EC] uppercase">Clear All Order History?</h4>
            </div>
            <p className="font-sans-clean text-xs text-[#D1C4BE] font-light leading-relaxed">
              This will permanently delete all {allOrders.length} stored order requests from this browser's local storage.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsClearingAll(false)}
                className="px-4 py-2 border border-[#4E4541] text-[#D1C4BE] hover:text-[#FAF4EC] text-xs font-sans-clean uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearAllOrders();
                  setIsClearingAll(false);
                }}
                className="px-4 py-2 bg-[#692929] hover:bg-[#853434] text-[#FAF4EC] text-xs font-sans-clean uppercase tracking-wider font-semibold"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
